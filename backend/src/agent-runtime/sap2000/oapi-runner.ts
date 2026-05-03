/**
 * SAP2000 OAPI 运行时
 *
 * 封装 SAP2000 COM 接口调用逻辑。
 * 从 jzwang1021/WTdesign/yuhoner-1 module3 提炼，
 * 但采用更清晰的接口设计，脱离 Excel 数据总线。
 *
 * 依赖：comtypes (Python) / win32com (Python)
 * 在 WSL 下需通过 Windows Python 解释器运行。
 */

export interface Sap2000Config {
  /** Path to SAP2000 installation */
  installPath?: string;
  /** Units for model: 'N_mm' | 'N_m' | 'kN_m' | 'kip_in' */
  units: string;
  /** Whether to show SAP2000 GUI */
  visible: boolean;
}

export interface SapModelParams {
  /** Tower geometry */
  numSides: number;
  segmentData: Array<{
    zBot: number;       // m
    zTop: number;       // m
    widthBot: number;   // m
    widthTop: number;   // m
    type: number;       // segment type
  }>;

  /** Member sections (mm) */
  legSections: Array<{ diameter: number; thickness: number; material: string }>;
  hrzSections: Array<{ diameter: number; thickness: number; material: string }>;
  dgnSections: Array<{ diameter: number; thickness: number; material: string }>;

  /** Materials */
  steelGrades: Array<{ name: string; fy: number; fu: number; E: number; density: number }>;

  /** Loads */
  topLoads?: Array<{
    fx: number; fy: number; fz: number;
    mx: number; my: number; mz: number;
    loadCase: string;
  }>;

  /** Design settings */
  designCode: 'Chinese 2018' | 'Eurocode 3' | 'AISC 360-16';
  seismicGrade?: number;
}

export interface SapAnalysisResults {
  /** Nodal displacements */
  maxDisplacement: number;    // mm
  /** Modal frequencies */
  modalFrequencies: number[]; // Hz
  /** Max member stress ratio */
  maxStressRatio: number;
  /** Total mass */
  totalMass: number;          // t
  /** member forces summary */
  legForces: Array<{ segment: number; P: number; M2: number; M3: number }>;
  baseForces: { Fx: number; Fy: number; Fz: number; Mx: number; My: number; Mz: number };
}

/**
 * Python 代码模板，用于通过 comtypes 调用 SAP2000 OAPI。
 * WTAgent 通过子进程调用此 Python 脚本。
 */
export const SAP2000_PYTHON_TEMPLATE = `
import comtypes.client
import math
import sys
import json

def connect_sap(visible=False):
    """启动 SAP2000 并返回 SapModel 对象"""
    helper = comtypes.client.CreateObject('SAP2000.SapObject')
    helper.ApplicationStart()
    mySapObject = helper.SapObject
    mySapObject.Visible = visible
    SapModel = mySapObject.SapModel
    SapModel.InitializeNewModel()
    SapModel.File.NewBlank()
    return mySapObject, SapModel

def create_lattice_tower(params_file: str, output_file: str):
    \"\"\"
    参数化格构塔建模与分析（对应 module3 ~ module8）
    
    Args:
        params_file: JSON 文件路径，包含所有建模参数
        output_file: JSON 输出路径
    
    参数 JSON 结构:
    {
        "numSides": 4,
        "hubHeight": 90,
        "latticeHeight": 85,
        "transitionHeight": 5,
        "segments": [
            {"zBot": 0, "zTop": 14.17, "widthBot": 4.0, "widthTop": 3.5, "type": 1}
        ],
        "legSections": [{"diameter": 273, "thickness": 12, "material": "Q355"}],
        "hrzSections": [...],
        "dgnSections": [...],
        "topLoad": {"fx": 500, "fy": 0, "fz": -3000, "mx": 0, "my": 50000, "mz": 0}
    }
    \"\"\"
    with open(params_file, 'r') as f:
        params = json.load(f)
    
    mySapObject, SapModel = connect_sap(visible=False)
    
    # ---- Set units ----
    units_list = ['lb_in', 'lb_ft', 'kip_in', 'kip_ft', 'kN_mm', 'kN_m',
                  'kgf_mm', 'kgf_m', 'N_mm', 'N_m', 'Ton_mm', 'Ton_m',
                  'kN_cm', 'kgf_cm', 'N_cm', 'Ton_cm']
    units_index = units_list.index('N_mm') + 1
    SapModel.SetPresentUnits(units_index)
    
    # ---- Define materials (ref: module5 define_Steel_mat) ----
    for steel in params.get('steelGrades', [{'name':'Q355','fy':355,'fu':470,'E':206000,'density':7850}]):
        name = steel['name']
        SapModel.PropMaterial.SetMaterial(name, 1)  # eMatType_Steel
        # Set isotropic properties
        SapModel.PropMaterial.SetMPIsotropic(name, steel['E'] * 1e6, 0.3, 0.0000117)
        SapModel.PropMaterial.SetWeightAndMass(name, 2, steel['density'] * 9.81e-9)
    
    # ---- Define sections (ref: module5 define_sect) ----
    n_side = params['numSides']
    sign_tmp = _get_sign_template(n_side)
    
    node_count = 0
    elem_count = 0
    kk_nd = 0
    kk_elem = 0
    n_node_estimate = 10000
    n_name = [''] * n_node_estimate
    
    # ---- Base nodes ----
    Bm = params['segments'][0]['widthBot'] / 2 * 1000  # mm
    for jj in range(n_side):
        ret = SapModel.PointObj.AddCartesian(
            Bm * sign_tmp[jj][0], Bm * sign_tmp[jj][1], 0, str(node_count))
        n_name[kk_nd] = str(int(ret[0]))
        kk_nd += 1
        node_count = int(ret[0])
    
    # ---- Modal analysis ----
    SapModel.LoadCases.ModalEigen.SetCase('MODAL')
    
    # Run analysis and get results
    ret = SapModel.Analyze.RunAnalysis()
    
    # Get modal frequencies
    NumberResults = 0
    ret = SapModel.Results.ModalPeriods(NumberResults)
    num_modes = ret[0]
    periods = list(ret[3])  # Periods in seconds
    frequencies = [1/p if p > 0 else 0 for p in periods]
    
    # Get max frame stress ratios (Chinese 2018 design check)
    ret = SapModel.DesignSteel.SetCode('Chinese 2018')
    SapModel.DesignSteel.StartDesign()
    
    # Get summary results
    output = {
        'modalFrequencies': frequencies[:6],
        'numNodes': kk_nd,
        'numElements': kk_elem,
        'status': 'success',
    }
    
    with open(output_file, 'w') as f:
        json.dump(output, f, indent=2)
    
    # Cleanup
    mySapObject.ApplicationExit(False)

def _get_sign_template(n_side: int):
    \"\"\"Get vertex sign template for n-sided polygon\"\"\"
    Bt = 1000  # unit multiplier in mm
    if n_side == 4:
        return [[Bt, Bt, 0, Bt], [-Bt, Bt, -Bt, 0],
                [-Bt, -Bt, 0, -Bt], [Bt, -Bt, Bt, 0]]
    elif n_side == 3:
        import math
        return [[Bt, -math.sqrt(3)/3*Bt, Bt/2, math.sqrt(3)/6*Bt],
                [0, math.sqrt(3)*2/3*Bt, -Bt/2, math.sqrt(3)/6*Bt],
                [-Bt, -math.sqrt(3)/3*Bt, 0, -math.sqrt(3)/3*Bt]]
    elif n_side == 6:
        import math
        s3 = math.sqrt(3)
        return [[Bt, s3*Bt, 0, s3*Bt], [-Bt, s3*Bt, -1.5*Bt, s3/2*Bt],
                [-2*Bt, 0, -1.5*Bt, -s3/2*Bt], [-Bt, -s3*Bt, 0, -s3*Bt],
                [Bt, -s3*Bt, 1.5*Bt, -s3/2*Bt], [2*Bt, 0, 1.5*Bt, s3/2*Bt]]
    return _get_sign_template(4)

if __name__ == '__main__':
    create_lattice_tower(sys.argv[1], sys.argv[2])
`;
