import type { SkillHandler } from '../../../types/skill.types.js';

/**
 * Steel Tower Skill Handler
 *
 * Extracts tower parameters from natural language input.
 * Expected parameters:
 *  - totalHeight: total tower height (m)
 *  - baseDiameter: bottom diameter (m)
 *  - topDiameter: top diameter (m)
 *  - hubHeight: hub height (m)
 *  - rotorDiameter: rotor diameter (m)
 *  - turbineRating: turbine rated power (MW)
 *  - massTopHead: rotor + nacelle mass (t)
 *  - segments: number of tower segments
 */

// Simple regex-based parameter extraction patterns
const PATTERNS: Array<{ key: string; regex: RegExp; unit?: string }> = [
  { key: 'totalHeight', regex: /(?:塔高|总高|高度|height)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'baseDiameter', regex: /(?:底径|底部直径|base.?diam)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'topDiameter', regex: /(?:顶径|顶部直径|top.?diam)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'hubHeight', regex: /(?:轮毂高度|hub.?height)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'rotorDiameter', regex: /(?:风轮直径|转子直径|rotor.?diam)[：: ]*(\d+(?:\.\d+)?)\s*m/i },
  { key: 'turbineRating', regex: /(?:额定功率|容量|rating|power)[：: ]*(\d+(?:\.\d+)?)\s*(?:MW|mw|兆瓦)?/i },
  { key: 'massTopHead', regex: /(?:机头质量|机舱质量|nacelle.?mass|top.?mass)[：: ]*(\d+(?:\.\d+)?)\s*t/i },
  { key: 'segments', regex: /(?:分段数|节段|segments)[：: ]*(\d+)/i },
];

export const steelTowerHandler: SkillHandler = {
  detectIntent(input: string) {
    const lower = input.toLowerCase();
    const triggers = ['钢塔', '锥筒塔', 'steel tower', 'conical tower', '塔筒', '风电塔', 'tower'];
    const matched = triggers.some((t) => lower.includes(t));
    return { matched, confidence: matched ? 0.8 : 0 };
  },

  extractDraft(input: string) {
    const params: Record<string, unknown> = {};

    for (const pattern of PATTERNS) {
      const match = input.match(pattern.regex);
      if (match) {
        params[pattern.key] = parseFloat(match[1]);
      }
    }

    return params;
  },

  getClarificationQuestions(params: Record<string, unknown>) {
    const questions: string[] = [];
    const required = [
      { key: 'totalHeight', label: '塔筒总高度 (m)' },
      { key: 'baseDiameter', label: '底部直径 (m)' },
      { key: 'topDiameter', label: '顶部直径 (m)' },
      { key: 'rotorDiameter', label: '风轮直径 (m)' },
      { key: 'turbineRating', label: '额定功率 (MW)' },
      { key: 'massTopHead', label: '机头总质量 (t)' },
    ];

    for (const req of required) {
      if (params[req.key] === undefined) {
        questions.push(`请提供**${req.label}**`);
      }
    }

    return questions;
  },

  async execute(params: Record<string, unknown>) {
    // Build a structured tower geometry from the extracted params
    const height = params.totalHeight as number || 0;
    const baseD = params.baseDiameter as number || 0;
    const topD = params.topDiameter as number || 0;
    const segments = (params.segments as number) || 3;

    // Calculate segment geometry (uniform taper)
    const segmentList = [];
    for (let i = 0; i < segments; i++) {
      const segStart = (i / segments) * height;
      const segEnd = ((i + 1) / segments) * height;
      const dBottom = baseD - (segStart / height) * (baseD - topD);
      const dTop = baseD - (segEnd / height) * (baseD - topD);
      segmentList.push({
        id: i + 1,
        bottomElevation: Math.round(segStart * 100) / 100,
        topElevation: Math.round(segEnd * 100) / 100,
        bottomDiameter: Math.round(dBottom * 100) / 100,
        topDiameter: Math.round(dTop * 100) / 100,
        // Default wall thickness estimation
        thickness: Math.round((dBottom / 100 + 0.008) * 1000) / 1000,
      });
    }

    return {
      towerType: 'steel-conical',
      totalHeight: height,
      baseDiameter: baseD,
      topDiameter: topD,
      segments: segmentList,
      taperRatio: baseD > 0 ? baseD / topD : 0,
      // Compute hub height (typically tower height + 5m for clearance)
      hubHeight: params.hubHeight ?? height + 5,
      rotorDiameter: params.rotorDiameter ?? 0,
      turbineRating: params.turbineRating ?? 0,
      massTopHead: params.massTopHead ?? 0,
      estimatedMass: `~${Math.round(0.5 * Math.PI * (baseD + topD) / 2 * height * 0.02 * 7850 / 1000)} t`,
    };
  },
};

export default steelTowerHandler;
