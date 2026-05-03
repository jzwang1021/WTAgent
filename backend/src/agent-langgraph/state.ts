import { Annotation, type BaseChannel } from '@langchain/langgraph';
import { type BaseMessage } from '@langchain/core/messages';
import type {
  TowerType, TowerParams, WindClass, TurbulenceCategory,
  DLCCase, FrequencyCheck, AnalysisEngine, AnalysisResult,
  CodeCheckResult,
} from '../types/agent.types.js';

/**
 * WTAgent state definition for LangGraph.
 * Uses LangGraph's Annotation-based state API.
 */
export const AgentState = Annotation.Root({
  // === Conversation ===
  messages: Annotation<BaseMessage[]>({
    reducer: (a, b) => [...a, ...b],
    default: () => [],
  }),
  projectId: Annotation<string>({
    reducer: (a, b) => b ?? a,
    default: () => '',
  }),

  // === Tower ===
  towerType: Annotation<TowerType>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),
  towerParams: Annotation<TowerParams | null>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),

  // === Wind ===
  windClass: Annotation<WindClass>({
    reducer: (a, b) => b ?? a,
    default: () => 'II',
  }),
  turbulenceCategory: Annotation<TurbulenceCategory>({
    reducer: (a, b) => b ?? a,
    default: () => 'B',
  }),
  dlcCases: Annotation<DLCCase[]>({
    reducer: (a, b) => b ?? a,
    default: () => [],
  }),
  thrustForce: Annotation<number>({
    reducer: (a, b) => b ?? a,
    default: () => 0,
  }),

  // === Frequency ===
  frequencyCheck: Annotation<FrequencyCheck | null>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),

  // === Analysis ===
  analysisEngine: Annotation<AnalysisEngine | null>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),
  analysisResults: Annotation<AnalysisResult | null>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),

  // === Code Check ===
  codeCheckResults: Annotation<CodeCheckResult[]>({
    reducer: (a, b) => b ?? a,
    default: () => [],
  }),

  // === Report ===
  reportPath: Annotation<string | null>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),

  // === Skill Management ===
  activeSkill: Annotation<string | null>({
    reducer: (a, b) => b ?? a,
    default: () => null,
  }),
  skillState: Annotation<'idle' | 'running' | 'awaiting_input' | 'done' | 'error'>({
    reducer: (a, b) => b ?? a,
    default: () => 'idle',
  }),
  skillContext: Annotation<Record<string, unknown>>({
    reducer: (a, b) => ({ ...a, ...b }),
    default: () => ({}),
  }),
});
