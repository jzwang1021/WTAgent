export type SkillStage = 'intent' | 'draft' | 'analysis' | 'design' | 'report';
export type SkillSource = 'builtin' | 'user';

export interface SkillMeta {
  id: string;
  domain: string;
  source: SkillSource;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  triggers: string[];
  stages: SkillStage[];
  structureType?: string;
  capabilities: string[];
  requires: string[];
  conflicts: string[];
  priority: number;
}

export interface Skill {
  meta: SkillMeta;
  handler: SkillHandler;
}

export interface SkillHandler {
  /** Intent detection: determine if this skill matches user input */
  detectIntent(input: string): { matched: boolean; confidence: number };
  /** Extract draft parameters from user input */
  extractDraft(input: string): Record<string, unknown>;
  /** Generate clarifying questions for missing parameters */
  getClarificationQuestions(params: Record<string, unknown>): string[];
  /** Build analysis model / execute analysis */
  execute(params: Record<string, unknown>): Promise<Record<string, unknown>>;
}
