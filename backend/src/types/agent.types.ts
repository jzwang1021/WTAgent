import { type BaseMessage } from '@langchain/core/messages';

// ===== Tower Geometry =====
export type TowerType = 'steel-conical' | 'lattice' | 'hybrid' | 'concrete' | null;

export interface TowerSegment {
  id: number;
  bottomDiameter: number;   // m
  topDiameter: number;      // m
  height: number;           // m
  thickness: number;        // m
  material: string;         // e.g. 'S355', 'S420'
}

export interface TowerParams {
  totalHeight: number;          // m
  baseDiameter: number;         // m
  topDiameter: number;          // m
  segments: TowerSegment[];
  hubHeight: number;            // m
  rotorDiameter: number;        // m
  turbineRating: number;        // MW
  massTopHead: number;          // t (rotor + nacelle)
}

// ===== Wind Load =====
export type WindClass = 'I' | 'II' | 'III';
export type TurbulenceCategory = 'A' | 'B' | 'C';

export interface DLCCase {
  id: string;
  name: string;
  description: string;
  windSpeed: number;       // m/s, reference
  turbulenceIntensity: number;
  safetyFactor: number;
}

// ===== Frequency =====
export interface FrequencyCheck {
  targetFreq: number;       // Hz, estimated 1st mode
  rotorFreq1P: number;      // Hz
  bladeFreq3P: number;      // Hz
  status: 'pass' | 'fail' | 'pending';
  strategy: 'soft-stiff' | 'stiff-stiff';
  detail: string;
}

// ===== Analysis =====
export type AnalysisEngine = 'openfast' | 'opensees' | 'sap2000';

export interface ModalResult {
  modeNumber: number;
  frequency: number;       // Hz
  description: string;
}

export interface StressResult {
  location: string;
  value: number;           // MPa
  component: string;
}

export interface AnalysisResult {
  engine: AnalysisEngine;
  modalResults: ModalResult[];
  maxStress: number;
  maxDisplacement: number; // m
  status: 'success' | 'error';
  errorMessage?: string;
  outputPath?: string;
}

// ===== Code Check =====
export interface CodeCheckResult {
  checkType: 'ultimate' | 'fatigue' | 'buckling' | 'frequency';
  clause: string;
  status: 'pass' | 'fail' | 'warning';
  demand: number;
  capacity: number;
  ratio: number;
  detail: string;
}

// ===== Agent State =====
export interface WTAgentState {
  messages: BaseMessage[];
  projectId: string;

  towerType: TowerType;
  towerParams: TowerParams | null;

  windClass: WindClass;
  turbulenceCategory: TurbulenceCategory;
  dlcCases: DLCCase[];
  thrustForce: number;

  frequencyCheck: FrequencyCheck | null;

  analysisEngine: AnalysisEngine | null;
  analysisResults: AnalysisResult | null;

  codeCheckResults: CodeCheckResult[];

  reportPath: string | null;

  activeSkill: string | null;
  skillState: 'idle' | 'running' | 'awaiting_input' | 'done' | 'error';
  skillContext: Record<string, unknown>;
}
