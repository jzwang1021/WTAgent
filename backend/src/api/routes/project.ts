import { type FastifyInstance } from 'fastify';
import { createScopedLogger } from '../../utils/logger.js';

const log = createScopedLogger('api:project');

interface ProjectBody {
  name: string;
  description?: string;
}

export async function projectRoutes(app: FastifyInstance): Promise<void> {
  // GET /api/projects - List all projects
  app.get('/api/projects', async () => {
    // Placeholder: return empty list until DB is connected
    return { projects: [] };
  });

  // POST /api/projects - Create a new project
  app.post<{ Body: ProjectBody }>('/api/projects', async (request, reply) => {
    const { name, description } = request.body;
    log.info(`Create project: ${name}`);

    // Placeholder
    return {
      id: `proj_${Date.now()}`,
      name,
      description,
      createdAt: new Date().toISOString(),
    };
  });

  // GET /api/projects/:id - Get project details
  app.get<{ Params: { id: string } }>('/api/projects/:id', async (request) => {
    const { id } = request.params;
    return {
      id,
      name: 'Project',
      status: 'active',
    };
  });
}
