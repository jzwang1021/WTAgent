import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'js-yaml';
import type { SkillMeta, Skill, SkillHandler } from '../types/skill.types.js';
import { createScopedLogger } from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const log = createScopedLogger('skill-service');

let cachedSkills: Skill[] | null = null;

/**
 * Get the skills directory path.
 */
function getSkillsDir(): string {
  // Try multiple locations
  const candidates = [
    join(__dirname, '../../src/agent-skills'),
    join(__dirname, '../agent-skills'),
    join(process.cwd(), 'src/agent-skills'),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return candidates[0];
}

/**
 * Load a skill from a directory containing skill.yaml and handler.ts.
 */
function loadSkillFromDir(skillDir: string): Skill | null {
  const yamlPath = join(skillDir, 'skill.yaml');
  const handlerPath = join(skillDir, 'handler.ts');

  if (!existsSync(yamlPath)) {
    return null;
  }

  try {
    // Parse YAML metadata
    const yamlContent = readFileSync(yamlPath, 'utf-8');
    const meta = parseYaml(yamlContent) as SkillMeta;

    // Create a default handler
    // In production, this would dynamically import the handler module
    const handler: SkillHandler = {
      detectIntent(input: string): { matched: boolean; confidence: number } {
        const lower = input.toLowerCase();
        const matched = meta.triggers.some((t) => lower.includes(t.toLowerCase()));
        return { matched, confidence: matched ? meta.priority / 100 : 0 };
      },
      extractDraft(_input: string): Record<string, unknown> {
        return {}; // Override in specific skill handlers
      },
      getClarificationQuestions(_params: Record<string, unknown>): string[] {
        return []; // Override in specific skill handlers
      },
      async execute(_params: Record<string, unknown>): Promise<Record<string, unknown>> {
        return { status: 'ok', message: `${meta.name.zh} skill executed` };
      },
    };

    return { meta, handler };
  } catch (error) {
    log.error(`Failed to load skill from ${skillDir}: ${error}`);
    return null;
  }
}

/**
 * Walk the skills directory and load all skills.
 */
function discoverSkills(): Skill[] {
  const skillsDir = getSkillsDir();
  log.info(`Scanning skills directory: ${skillsDir}`);

  if (!existsSync(skillsDir)) {
    log.warn('Skills directory not found');
    return [];
  }

  const skills: Skill[] = [];

  // Walk domain directories
  const domains = readdirSync(skillsDir).filter((d) => {
    const fullPath = join(skillsDir, d);
    return statSync(fullPath).isDirectory() && !d.startsWith('.');
  });

  for (const domain of domains) {
    const domainPath = join(skillsDir, domain);
    const skillDirs = readdirSync(domainPath).filter((d) => {
      const fullPath = join(domainPath, d);
      return statSync(fullPath).isDirectory();
    });

    for (const skillName of skillDirs) {
      const skillPath = join(domainPath, skillName);
      const skill = loadSkillFromDir(skillPath);
      if (skill) {
        skills.push(skill);
        log.info(`  Loaded skill: ${skill.meta.domain}/${skill.meta.id}`);
      }
    }
  }

  log.info(`Total skills loaded: ${skills.length}`);
  return skills;
}

/**
 * Load all skills (with caching).
 */
export function loadSkills(): Skill[] {
  if (!cachedSkills) {
    cachedSkills = discoverSkills();
  }
  return cachedSkills;
}

/**
 * Reload skills (clear cache).
 */
export function reloadSkills(): Skill[] {
  cachedSkills = null;
  return loadSkills();
}
