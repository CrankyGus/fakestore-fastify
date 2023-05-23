import { FastifyInstance } from 'fastify';

async function healthCheck(fastify: FastifyInstance) {
  fastify.get('/health', async () => {
    return { status: 'ok' };
  });
}

export default healthCheck;
