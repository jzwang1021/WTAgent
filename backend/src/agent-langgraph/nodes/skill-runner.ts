import { AIMessage } from '@langchain/core/messages';
import { AgentState } from '../state.js';
import { toolRegistry } from '../tool-registry.js';
import { loadSkills } from '../../services/skill-service.js';
import { createScopedLogger } from '../../utils/logger.js';

const log = createScopedLogger('skill-runner');

/**
 * Skill Runner node: executes the active skill's handler.
 * Calls the skill's execute method and updates state with results.
 */

export async function skillRunnerNode(
  state: typeof AgentState.State,
): Promise<Partial<typeof AgentState.State>> {
  if (!state.activeSkill || state.skillState !== 'running') {
    return { skillState: 'idle' };
  }

  const skills = loadSkills();
  const skill = skills.find((s) => s.meta.id === state.activeSkill);

  if (!skill) {
    log.warn(`Skill not found: ${state.activeSkill}`);
    return {
      skillState: 'error',
      messages: [
        new AIMessage({ content: `未找到技能 [${state.activeSkill}]，请检查配置。` }),
      ],
    };
  }

  try {
    // Get the last user message for context
    const lastMessage = state.messages[state.messages.length - 1];
    const userInput = lastMessage?.content?.toString() ?? '';

    // Run intent detection
    const intent = skill.handler.detectIntent(userInput);

    if (!intent.matched) {
      // Try general engineering tools
      const tools = toolRegistry.getAll();
      if (tools.length > 0) {
        return {
          skillState: 'running',
          skillContext: { toolsAvailable: tools.map((t) => t.name) },
        };
      }

      return {
        skillState: 'idle',
        messages: [
          new AIMessage({
            content: `我理解您的需求可能涉及领域 [${skill.meta.name.zh}]，但需要更多信息来确认。请提供更详细的设计参数。`,
          }),
        ],
      };
    }

    // Extract draft parameters
    const params = skill.handler.extractDraft(userInput);

    // Check for missing critical parameters
    const questions = skill.handler.getClarificationQuestions(params);

    if (questions.length > 0) {
      return {
        skillState: 'awaiting_input',
        skillContext: { params, missingParams: questions },
        messages: [
          new AIMessage({
            content: `已识别到您正在设计 ${skill.meta.name.zh}，我需要补充以下参数：\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`,
          }),
        ],
      };
    }

    // Execute the skill
    const result = await skill.handler.execute(params);

    return {
      skillState: 'done',
      skillContext: { ...state.skillContext, params, result },
      messages: [
        new AIMessage({
          content: `✅ ${skill.meta.name.zh} 参数提取完成。\n\n${JSON.stringify(result, null, 2)}`,
        }),
      ],
    };
  } catch (error) {
    log.error(`Skill execution error: ${error}`);
    return {
      skillState: 'error',
      messages: [
        new AIMessage({
          content: `❌ 技能 [${skill.meta.name.zh}] 执行出错：${error instanceof Error ? error.message : String(error)}`,
        }),
      ],
    };
  }
}
