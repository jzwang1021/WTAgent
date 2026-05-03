import Fastify from 'fastify';
import cors from '@fastify/cors';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadConfig } from './config/index.js';
import { chatRoutes } from './api/routes/chat.js';
import { projectRoutes } from './api/routes/project.js';
import { createScopedLogger } from './utils/logger.js';

const log = createScopedLogger('server');

async function main() {
  const config = loadConfig();

  const app = Fastify({
    logger: false, // Use pino via our logger
  });

  // Register plugins
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // Register routes
  await app.register(chatRoutes);
  await app.register(projectRoutes);

  // Static files (frontend) — optional, skip if not built yet
  const frontendOut = new URL('../../frontend/out', import.meta.url);
  if (existsSync(frontendOut)) {
    const { default: fastifyStatic } = await import('@fastify/static');
    await app.register(fastifyStatic, {
      root: frontendOut,
      prefix: '/',
      wildcard: false,
    });
    log.info(`Serving frontend from ${frontendOut.pathname}`);
  } else {
    log.info('Frontend not built yet — API-only mode');
  }

  // Start server
  try {
    await app.listen({ port: config.port, host: config.host });
    log.info(`WTAgent server running at http://${config.host}:${config.port}`);
    log.info(`LLM: ${config.llm.provider}/${config.llm.model}`);
    log.info(`Projects: ${config.analysis.projectsDir}`);
  } catch (err) {
    log.error(`Failed to start server: ${err}`);
    process.exit(1);
  }
}

main();
