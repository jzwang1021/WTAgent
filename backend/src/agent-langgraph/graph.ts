import { StateGraph, START, END } from '@langchain/langgraph';
import { AgentState } from './state.js';
import { supervisorNode } from './nodes/supervisor.js';
import { skillRunnerNode } from './nodes/skill-runner.js';
import { reportGenNode } from './nodes/report-gen.js';
import { toolRegistry } from './tool-registry.js';
import { engineeringTools } from './tools.js';
import { iecCodeQuery } from './rag-tool.js';
import { buildSystemPrompt } from './system-prompt.js';
import { createScopedLogger } from '../utils/logger.js';

const log = createScopedLogger('graph');

// Register engineering tools
for (const t of engineeringTools) {
  toolRegistry.register(t);
}

// Register RAG tools
toolRegistry.register(iecCodeQuery);

/**
 * Build and compile the WTAgent state graph.
 */
export function buildAgent() {
  log.info('Building WTAgent LangGraph...');

  const graph = new StateGraph(AgentState)
    // === Nodes ===
    .addNode('supervisor', supervisorNode)
    .addNode('skill_runner', skillRunnerNode)
    .addNode('report_gen', reportGenNode)

    // === Edges ===
    .addEdge(START, 'supervisor')
    .addConditionalEdges('supervisor', (state) => {
      if (state.activeSkill && state.skillState === 'running') {
        return 'skill_runner';
      }
      return 'report_gen';
    })
    .addConditionalEdges('skill_runner', (state) => {
      if (state.skillState === 'awaiting_input') {
        return END; // Wait for user response
      }
      return 'report_gen';
    })
    .addEdge('report_gen', END);

  const app = graph.compile();

  log.info('WTAgent graph compiled successfully');

  return {
    app,
    systemPrompt: buildSystemPrompt(),
    tools: toolRegistry.getAll(),
  };
}

export type AgentInstance = ReturnType<typeof buildAgent>;
