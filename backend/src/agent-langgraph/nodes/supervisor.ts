import type { RunnableConfig } from '@langchain/core/runnables';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { AgentState } from '../state.js';
import { toolRegistry } from '../tool-registry.js';
import type { SkillMeta } from '../../types/skill.types.js';
import { loadSkills } from '../../services/skill-service.js';

/**
 * Supervisor node: analyze user input and route to the appropriate skill.
 * Returns modified state with activeSkill set.
 */

interface SkillMatch {
  skill: SkillMeta;
  confidence: number;
}

function findBestSkill(input: string): SkillMatch | null {
  const skills = loadSkills();
  const lowerInput = input.toLowerCase();

  const matches: SkillMatch[] = skills
    .map((skill) => {
      const meta = skill.meta;
      // Check if any trigger word matches
      const matched = meta.triggers.some((t) => lowerInput.includes(t.toLowerCase()));
      return {
        skill: meta,
        confidence: matched ? meta.priority : 0,
      };
    })
    .filter((m) => m.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence);

  return matches.length > 0 ? matches[0] : null;
}

export async function supervisorNode(
  state: typeof AgentState.State,
  config?: RunnableConfig,
): Promise<Partial<typeof AgentState.State>> {
  const lastMessage = state.messages[state.messages.length - 1];
  if (!lastMessage || lastMessage.getType() !== 'human') {
    return { skillState: 'idle' };
  }

  const userInput = lastMessage.content?.toString() ?? '';

  // Route to the best matching skill
  const match = findBestSkill(userInput);

  if (match) {
    return {
      activeSkill: match.skill.id,
      skillState: 'running',
    };
  }

  // No matching skill — respond as general assistant
  return {
    activeSkill: null,
    skillState: 'idle',
  };
}
