import { type FastifyInstance } from 'fastify';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { buildAgent } from '../../agent-langgraph/graph.js';
import { createScopedLogger } from '../../utils/logger.js';

const log = createScopedLogger('api:chat');

interface ChatRequest {
  message: string;
  projectId?: string;
  conversationId?: string;
}

interface ChatResponse {
  reply: string;
  projectId: string;
  skillState: string;
  towerType?: string | null;
}

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  const agent = buildAgent();

  // POST /api/chat - Send a message and get a response
  app.post<{ Body: ChatRequest }>('/api/chat', async (request, reply) => {
    const { message, projectId = 'default' } = request.body;

    log.info(`Chat request: project=${projectId}, message="${message.slice(0, 50)}..."`);

    try {
      // Convert the message to LangChain format
      const messages = [
        new SystemMessage({ content: agent.systemPrompt }),
        new HumanMessage({ content: message }),
      ];

      // Run the agent graph
      const result = await agent.app.invoke({
        messages,
        projectId,
        towerType: null,
        towerParams: null,
        windClass: 'II',
        turbulenceCategory: 'B',
        dlcCases: [],
        thrustForce: 0,
        frequencyCheck: null,
        analysisEngine: null,
        analysisResults: null,
        codeCheckResults: [],
        reportPath: null,
        activeSkill: null,
        skillState: 'idle',
        skillContext: {},
      });

      // Extract the last AI message
      const lastMsg = result.messages[result.messages.length - 1];
      const replyText = lastMsg?.content?.toString() ?? '处理完成。';

      return {
        reply: replyText,
        projectId: result.projectId,
        skillState: result.skillState,
        towerType: result.towerType,
      } satisfies ChatResponse;
    } catch (error) {
      log.error(`Chat error: ${error}`);
      return reply.status(500).send({
        error: '处理请求时出错',
        detail: error instanceof Error ? error.message : String(error),
      });
    }
  });

  // GET /api/chat/health - Health check
  app.get('/api/chat/health', async () => {
    return {
      status: 'ok',
      skills: agent.tools.length,
      tools: agent.tools.map((t) => t.name),
    };
  });
}
