/**
 * Engine Registry
 * 
 * Maps task types to analysis engines (OpenFAST / OpenSeesPy / SAP2000).
 * Resolves the correct runtime based on task description.
 * 
 * Task → Engine mapping:
 *   - Aero-servo-elastic simulation + load generation → OpenFAST
 *   - Structural design verification → SAP2000 OAPI
 *   - Seismic / nonlinear analysis → OpenSeesPy
 *   - Fatigue damage calculation → Python compute + postprocess
 */

export type EngineType = 'openfast' | 'opensees' | 'sap2000' | 'python';

export interface EngineRegistration {
  type: EngineType;
  name: string;
  description: string;
  taskTypes: string[];
  runnerPath: string;
  available: boolean;
}

const engineRegistry = new Map<EngineType, EngineRegistration>();

export function registerEngine(engine: EngineRegistration): void {
  engineRegistry.set(engine.type, engine);
}

export function getEngine(type: EngineType): EngineRegistration | undefined {
  return engineRegistry.get(type);
}

export function resolveEngine(taskType: string): EngineType | null {
  for (const [, engine] of engineRegistry) {
    if (engine.taskTypes.includes(taskType)) {
      return engine.type;
    }
  }
  return null;
}

export function listEngines(): EngineRegistration[] {
  return Array.from(engineRegistry.values());
}

// Register default engines
registerEngine({
  type: 'openfast',
  name: 'OpenFAST',
  description: 'Aero-servo-elastic simulation → exports six-component internal forces at nacelle',
  taskTypes: ['load-generation', 'aero-elastic', 'wind-load', 'dlc-simulation'],
  runnerPath: 'agent-runtime/openfast/runner.ts',
  available: false,
});

registerEngine({
  type: 'sap2000',
  name: 'SAP2000',
  description: 'Structural design verification via OAPI — receives six-component force loads',
  taskTypes: ['structural-design', 'steel-design', 'concrete-design', 'code-check'],
  runnerPath: 'agent-runtime/sap2000/runner.ts',
  available: false,
});

registerEngine({
  type: 'opensees',
  name: 'OpenSeesPy',
  description: 'Seismic time-history analysis / Pushover / nonlinear buckling',
  taskTypes: ['seismic', 'pushover', 'nonlinear', 'time-history'],
  runnerPath: 'agent-runtime/opensees/runner.ts',
  available: false,
});

registerEngine({
  type: 'python',
  name: 'Python Compute',
  description: 'Fatigue, frequency check, post-processing calculations',
  taskTypes: ['fatigue', 'frequency', 'postprocess', 'optimization'],
  runnerPath: '',
  available: true,
});
