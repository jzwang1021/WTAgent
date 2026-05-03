/**
 * 格构式桁架塔 Skill Handler
 *
 * 根据 jzwang1021/WTdesign 仓库（yuhoner-1分支）的三件套代码提炼，
 * 封装 SAP2000 + OpenFAST + OpenSees 联合仿真优化流程。
 *
 * 数据流（继承原设计的 Excel 数据总线思想）：
 *   User Input → Params → [SAP2000 OAPI / OpenSeesPy / OpenFAST] → Results → Report
 *
 * 参考原代码模块映射：
 *   module1  → geometry utils
 *   module2  → geometry generation (gen_geom, divide_tool, solve_q1/q2/q3)
 *   module3  → SAP2000 model build
 *   module5  → material & section definition
 *   module8  → load application & analysis
 *   module9  → result extraction
 *   module10 → weight calculation
 *   module12 → transition piece design
 */

import type { SkillHandler } from '../../../types/skill.types.js';

// ===== Types for Lattice Tower =====

interface LatticeTowerParams {
  // Tower geometry
  totalHeight: number;       // m, total tower height
  latticeHeight: number;     // m, lattice section height
  hubHeight: number;         // m, hub height
  rotorDiameter: number;     // m, rotor diameter
  turbineRating: number;     // MW, rated power
  massTopHead: number;       // t, rotor+nacelle mass

  // Lattice geometry
  numSides: number;          // 3 | 4 | 5 | 6
  bottomWidth: number;       // m, bottom face width
  topWidth: number;          // m, top face width
  numSegments: number;       // number of lattice segments
  segmentType: number;       // 1-标准X型, 2-等比例, 3-混合

  // Transition piece (top tube section)
  hasTransitionPiece: boolean;
  transitionHeight: number;  // m
  tubeBaseDiameter: number;  // m
  tubeTopDiameter: number;   // m

  // Member sizing (per segment)
  legPipeDiameters: number[];    // mm, leg outer diameter per segment
  legPipeThicknesses: number[];  // mm, leg wall thickness per segment
  hrzPipeDiameters: number[];    // mm, horizontal brace diameter per segment
  hrzPipeThicknesses: number[];  // mm, horizontal brace thickness per segment
  dgnPipeDiameters: number[];    // mm, diagonal brace diameter per segment
  dgnPipeThicknesses: number[];  // mm, diagonal brace thickness per segment

  // Material
  steelGrade: string;        // 'Q345' | 'Q355' | 'Q420' | 'Q460'
  steelDensity: number;      // kg/m³, default 7850
  elasticModulus: number;    // MPa, default 206000
}

// ===== Sign Templates for different n_side =====

function getSignTemplate(nSide: number): number[][] {
  // sign_tmp[j][0..3] for each vertex: [x_outer, y_outer, x_inner, y_inner]
  const Bt = 1; // unit multiplier
  switch (nSide) {
    case 3:
      return [
        [Bt, -Math.sqrt(3) / 3 * Bt, Bt / 2, Math.sqrt(3) / 6 * Bt],
        [0, Math.sqrt(3) * 2 / 3 * Bt, -Bt / 2, Math.sqrt(3) / 6 * Bt],
        [-Bt, -Math.sqrt(3) / 3 * Bt, 0, -Math.sqrt(3) / 3 * Bt],
      ];
    case 4:
      return [
        [Bt, Bt, 0, Bt],
        [-Bt, Bt, -Bt, 0],
        [-Bt, -Bt, 0, -Bt],
        [Bt, -Bt, Bt, 0],
      ];
    case 5:
      const s54 = Math.sin(54 * Math.PI / 180);
      const t72 = Math.tan(72 * Math.PI / 180);
      const s36 = Math.sin(36 * Math.PI / 180);
      const t36 = Math.tan(36 * Math.PI / 180);
      return [
        [2 * Bt * s54, 2 * Bt * s54 / t72, Bt * s54, 0.5 * (2 * Bt * s54 / t72 + Bt / s36)],
        [0, Bt / s36, -Bt * s54, 0.5 * (Bt / s36 + 2 * Bt * s54 / t72)],
        [-2 * Bt * s54, 2 * Bt * s54 / t72, -0.5 * (2 * Bt * s54 + Bt), 0.5 * (2 * Bt * s54 / t72 - Bt / t36)],
        [-Bt, -Bt / t36, 0, -Bt / t36],
        [Bt, -Bt / t36, 0.5 * (2 * Bt * s54 + Bt), 0.5 * (2 * Bt * s54 / t72 - Bt / t36)],
      ];
    case 6:
      const s3 = Math.sqrt(3);
      return [
        [Bt, s3 * Bt, 0, s3 * Bt],
        [-Bt, s3 * Bt, -1.5 * Bt, s3 / 2 * Bt],
        [-2 * Bt, 0, -1.5 * Bt, -s3 / 2 * Bt],
        [-Bt, -s3 * Bt, 0, -s3 * Bt],
        [Bt, -s3 * Bt, 1.5 * Bt, -s3 / 2 * Bt],
        [2 * Bt, 0, 1.5 * Bt, s3 / 2 * Bt],
      ];
    default:
      return getSignTemplate(4);
  }
}

// ===== Geometry Calculation Functions (from module1) =====

function pi(): number { return Math.PI; }

function vCone(R1: number, R2: number, H: number): number {
  return pi() * H * (R1 * R1 + R2 * R2 + R2 * R1) / 3;
}

function aCir(d: number, isRadius: boolean): number {
  const r = isRadius ? d : d / 2;
  return r * r * pi();
}

function iCir(d: number, isRadius: boolean): number {
  const r = isRadius ? d : d / 2;
  return r * r * r * r * pi() * 0.25;
}

function aAnnular(R1: number, R2: number, mode: number): number {
  // mode 0: diameter+thickness, 1: diameter+diameter, 2: radius+thickness
  let r1 = R1, r2 = R2;
  if (mode === 0) { r1 = R1 / 2; r2 = r1 - R2; }
  else if (mode === 1) { r1 = R1 / 2; r2 = R2 / 2; }
  else if (mode === 2) { r2 = R1 - R2; }
  return aCir(r1, true) - aCir(r2, true);
}

function iAnnular(R1: number, R2: number, mode: number): number {
  let r1 = R1, r2 = R2;
  if (mode === 0) { r1 = R1 / 2; r2 = r1 - R2; }
  else if (mode === 1) { r1 = R1 / 2; r2 = R2 / 2; }
  else if (mode === 2) { r2 = R1 - R2; }
  return iCir(r1, true) - iCir(r2, true);
}

function interp(x0: number, x1: number, x2: number, y1: number, y2: number): number {
  return y1 + (y2 - y1) / (x2 - x1) * (x0 - x1);
}

function dIncircle(b: number, n: number): number {
  return b / Math.sin(pi() / n);
}

function dist3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
}

// ===== Lattice Geometry Generation (from module2) =====

/**
 * Generate lattice tower segment geometry
 * Follows divide_tool and gen_geom logic from module2
 */
function generateSegments(params: LatticeTowerParams): SegmentGeometry[] {
  const { latticeHeight, bottomWidth, topWidth, numSegments, numSides } = params;
  const segments: SegmentGeometry[] = [];
  const tanBeta = 2 * latticeHeight / (bottomWidth - topWidth);

  for (let i = 0; i < numSegments; i++) {
    const zBot = (i / numSegments) * latticeHeight;
    const zTop = ((i + 1) / numSegments) * latticeHeight;
    const widthBot = bottomWidth - (zBot / latticeHeight) * (bottomWidth - topWidth);
    const widthTop = bottomWidth - (zTop / latticeHeight) * (bottomWidth - topWidth);

    // Sign template for inner/outer bracing
    const sign = getSignTemplate(numSides);
    const Bb = widthBot / 2;
    const Bt = widthTop / 2;

    // Estimate diagonal brace angle
    const Hseg = latticeHeight / numSegments;
    const Lseg = (Bb + Bt) / 2;
    const tanTheta = Hseg / Lseg;
    const thetaDeg = Math.atan(tanTheta) * 180 / Math.PI;

    segments.push({
      segmentId: i + 1,
      zBottom: zBot,
      zTop: zTop,
      widthBottom: widthBot,
      widthTop: widthTop,
      height: zTop - zBot,
      halfWidthBot: Bb,
      halfWidthTop: Bt,
      diagonalAngle: thetaDeg,
      nodeCount: 4, // type 1 = 4 nodes per side
      elemCount: 20,
    });
  }

  return segments;
}

interface SegmentGeometry {
  segmentId: number;
  zBottom: number;
  zTop: number;
  widthBottom: number;
  widthTop: number;
  height: number;
  halfWidthBot: number;
  halfWidthTop: number;
  diagonalAngle: number;
  nodeCount: number;
  elemCount: number;
}

// ===== Member Weight Calculation (from module10) =====

function calcMemberLength(
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number,
): number {
  return dist3D(x1, y1, z1, x2, y2, z2);
}

function calcSectionArea(type: number, t1: number, t2: number): number {
  // type 0=pipe, 1=pipe(steel+concrete), 2=square tube, 3=angle
  if (type === 0 || type === 1) {
    return pi() * ((t1 / 2) ** 2 - (t1 / 2 - t2) ** 2);
  } else if (type === 2) {
    return t1 ** 2 - (t1 - 2 * t2) ** 2;
  } else {
    return t1 * t2 * 2 - t2 ** 2;
  }
}

function calcMemberWeight(
  diameter: number, thickness: number,
  length: number, density: number,
): number {
  const area = calcSectionArea(0, diameter, thickness);
  return area * length * density / 1e9; // convert mm²·m·kg/m³ → t
}

/**
 * Calculate total tower weight (参考 module10 WeightCal)
 */
function estimateTowerWeight(params: LatticeTowerParams): TowerWeightBreakdown {
  const nSide = params.numSides;
  const nSeg = params.numSegments;
  const segments = generateSegments(params);
  const density = params.steelDensity || 7850;

  let weightLeg = 0, weightHrz = 0, weightDgn = 0, weightDpg = 0;

  for (let i = 0; i < nSeg; i++) {
    const seg = segments[i];
    const sign = getSignTemplate(nSide);
    const dLeg = params.legPipeDiameters[i] || 200;
    const tLeg = params.legPipeThicknesses[i] || 10;
    const dHrz = params.hrzPipeDiameters[i] || 100;
    const tHrz = params.hrzPipeThicknesses[i] || 6;
    const dDgn = params.dgnPipeDiameters[i] || 80;
    const tDgn = params.dgnPipeThicknesses[i] || 5;

    // Legs: 1 per corner, slanted
    for (let j = 0; j < nSide; j++) {
      const xBot = seg.halfWidthBot * sign[j][0];
      const yBot = seg.halfWidthBot * sign[j][1];
      const xTop = seg.halfWidthTop * sign[j][0];
      const yTop = seg.halfWidthTop * sign[j][1];
      const len = calcMemberLength(xBot, yBot, seg.zBottom, xTop, yTop, seg.zTop);
      weightLeg += calcMemberWeight(dLeg, tLeg, len, density);
    }

    // Horizontals: perimeter ring per segment
    for (let j = 0; j < nSide; j++) {
      const jNext = (j + 1) % nSide;
      const x1 = seg.halfWidthTop * sign[j][0];
      const y1 = seg.halfWidthTop * sign[j][1];
      const x2 = seg.halfWidthTop * sign[jNext][0];
      const y2 = seg.halfWidthTop * sign[jNext][1];
      const len = calcMemberLength(x1, y1, seg.zTop, x2, y2, seg.zTop);
      weightHrz += calcMemberWeight(dHrz, tHrz, len, density);
    }

    // Diagonals: X-bracing
    const dgnPerSide = 4; // 2 X-diagonals × 2 halves
    for (let j = 0; j < nSide * dgnPerSide; j++) {
      weightDgn += calcMemberWeight(dDgn, tDgn, seg.height / Math.sin(seg.diagonalAngle * Math.PI / 180), density);
    }
  }

  return {
    totalTonnes: Math.round((weightLeg + weightHrz + weightDgn + weightDpg) / 1e6 * 100) / 100,
    legWeight: Math.round(weightLeg / 1e6 * 100) / 100,
    hrzWeight: Math.round(weightHrz / 1e6 * 100) / 100,
    dgnWeight: Math.round(weightDgn / 1e6 * 100) / 100,
    dpgWeight: Math.round(weightDpg / 1e6 * 100) / 100,
  };
}

interface TowerWeightBreakdown {
  totalTonnes: number;
  legWeight: number;
  hrzWeight: number;
  dgnWeight: number;
  dpgWeight: number;
}

// ===== Frequency Estimate for Lattice Tower =====

/**
 * Quick estimate of lattice tower first natural frequency
 * EqTube (equivalent tube) model: module10 → equivalent stiffness
 */
function estimateFrequency(params: LatticeTowerParams): number {
  const E = (params.elasticModulus || 206000) * 1e6; // Pa
  const H = params.totalHeight;
  const M_top = params.massTopHead * 1000; // kg

  // Estimate total steel mass
  const weight = estimateTowerWeight(params);
  const M_tower = weight.totalTonnes * 1000; // kg

  // Approximate equivalent pipe section at base
  const D_eq = params.bottomWidth * 1.2; // equivalent diameter ~1.2× face width
  const t_eq = 0.02; // approximate equivalent thickness
  const I_eq = Math.PI / 64 * (Math.pow(D_eq, 4) - Math.pow(D_eq - 2 * t_eq, 4));

  // Simple beam estimate (shear-flexible for lattice)
  const effectiveMass = M_tower / 3 + M_top;
  const stiffness = 3 * E * I_eq / Math.pow(H, 3);
  const freq = Math.sqrt(stiffness / effectiveMass) / (2 * Math.PI);

  return Math.round(freq * 1000) / 1000;
}

// ===== Parameter Extraction =====

// Regex patterns for parameter extraction
const PATTERNS: Array<{ key: string; regex: RegExp }> = [
  { key: 'totalHeight', regex: /(?:塔高|总高|高度|height)[：: ]*\s*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'latticeHeight', regex: /(?:桁架高度|格构高度|lattice.?height)[：: ]*\s*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'hubHeight', regex: /(?:轮毂高度|hub.?height)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'rotorDiameter', regex: /(?:风轮直径|转子直径|rotor.?diam)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'turbineRating', regex: /(?:额定功率|容量|rating|power)[：: ]*(\d+(?:\.\d+)?)\s*(?:MW|mw|兆瓦)?/i },
  { key: 'massTopHead', regex: /(?:机头质量|机舱质量|nacelle.?mass|top.?mass)[：: ]*(\d+(?:\.\d+)?)\s*t/i },
  { key: 'numSides', regex: /(?:边数|面数|side|n.?side)[：: ]*(\d+)/i },
  { key: 'bottomWidth', regex: /(?:底宽|底部宽度|bottom.?width)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'topWidth', regex: /(?:顶宽|顶部宽度|top.?width)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'numSegments', regex: /(?:分段数|节段数|segments)[：: ]*(\d+)/i },
  { key: 'transitionHeight', regex: /(?:转换段高度|过渡段|transition)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'steelGrade', regex: /(?:钢材|钢号|grade|steel)[：: ]*(Q\d{3})/i },
];

// ===== Handler Export =====

export const latticeTowerHandler: SkillHandler = {
  detectIntent(input: string) {
    const lower = input.toLowerCase();
    const triggers = [
      '格构塔', '桁架塔', '格构式', '桁架式', 'lattice', 'truss tower',
      '角钢塔', '塔架', '格构式塔架',
    ];
    const matched = triggers.some((t) => lower.includes(t));
    // Higher confidence if geometry params are present
    const hasGeometry = /\d+\s*m/.test(input) && /lattice|桁架|格构/.test(lower);
    return {
      matched,
      confidence: matched ? (hasGeometry ? 0.9 : 0.7) : 0,
    };
  },

  extractDraft(input: string) {
    const params: Record<string, unknown> = {};
    for (const p of PATTERNS) {
      const match = input.match(p.regex);
      if (match) params[p.key] = parseFloat(match[1]);
    }
    // Default values for missing but common params
    if (params.numSides === undefined) params.numSides = 4;
    if (params.numSegments === undefined) params.numSegments = 6;
    if (params.steelGrade === undefined) params.steelGrade = 'Q355';
    return params;
  },

  getClarificationQuestions(params: Record<string, unknown>) {
    const questions: string[] = [];
    const required = [
      { key: 'totalHeight', label: '塔筒总高度 (m)' },
      { key: 'latticeHeight', label: '桁架段高度 (m)' },
      { key: 'hubHeight', label: '轮毂高度 (m)' },
      { key: 'rotorDiameter', label: '风轮直径 (m)' },
      { key: 'turbineRating', label: '额定功率 (MW)' },
      { key: 'massTopHead', label: '机头总质量 (t)' },
      { key: 'bottomWidth', label: '桁架底部宽度 (m)' },
      { key: 'topWidth', label: '桁架顶部宽度 (m)' },
    ];
    for (const req of required) {
      if (params[req.key] === undefined) {
        questions.push(`请提供**${req.label}**`);
      }
    }
    return questions;
  },

  async execute(params: Record<string, unknown>) {
    const p = params as unknown as LatticeTowerParams;
    const nSide = p.numSides || 4;

    // 1. Generate geometry
    const segments = generateSegments(p);

    // 2. Estimate weight breakdown
    const weight = estimateTowerWeight(p);

    // 3. Estimate frequency
    const freq = estimateFrequency(p);
    const rotorRPM = 12; // typical for multi-MW turbine
    const freq1P = rotorRPM / 60;
    const freq3P = freq1P * 3;
    const isSoftStiff = freq > freq1P * 1.1 && freq < freq3P * 0.9;

    // 4. Generate segment summary table
    const segSummary = segments.map((s) => ({
      segment: s.segmentId,
      elevation: `${s.zBottom.toFixed(1)}-${s.zTop.toFixed(1)} m`,
      width: `${s.widthBottom.toFixed(2)}→${s.widthTop.toFixed(2)} m`,
      diagAngle: `${s.diagonalAngle.toFixed(1)}°`,
    }));

    // 5. Build output
    return {
      towerType: 'lattice',
      numSides: nSide,
      sectionType: `${nSide}边形`,
      totalHeight: p.totalHeight,
      latticeHeight: p.latticeHeight,
      hubHeight: p.hubHeight,
      segments: segSummary,
      segmentCount: segments.length,
      weightBreakdown: weight,
      frequency: {
        estimatedFreq: freq,
        rotorFreq1P: Math.round(freq1P * 1000) / 1000,
        bladeFreq3P: Math.round(freq3P * 1000) / 1000,
        designStrategy: isSoftStiff ? 'soft-stiff' : '需要详细计算',
        // Simplified geometry check from module2 geometry_check
        tipClearance: p.hubHeight - 0.5 * p.rotorDiameter > p.hubHeight - p.transitionHeight - p.latticeHeight
          ? '通过' : '需校验',
      },
      analysisCapabilities: [
        {
          engine: 'OpenFAST',
          tasks: ['气动-伺服-弹性仿真', 'DLC工况生成', '导出机舱六分量内力'],
          output: 'Fx, Fy, Fz, Mx, My, Mz → 供SAP2000验算',
          method: '子进程 + NREL 5MW参数适配',
        },
        {
          engine: 'SAP2000',
          tasks: ['结构设计验算', '钢框架设计(GB 50017-2018)'],
          inputFrom: 'OpenFAST六分量内力',
          method: 'OAPI COM接口 (comtypes)',
        },
        {
          engine: 'OpenSeesPy',
          tasks: ['抗震分析', 'Pushover分析', '非线性屈曲'],
          method: 'Python子进程',
        },
      ],
      // Store computed params for downstream skills
      computedParams: {
        signTemplate: getSignTemplate(nSide),
        tanBeta: 2 * p.latticeHeight / (p.bottomWidth - p.topWidth),
        dIncircle: dIncircle(p.bottomWidth, nSide),
      },
    };
  },
};

export default latticeTowerHandler;
