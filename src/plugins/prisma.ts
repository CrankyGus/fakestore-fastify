import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prisma = new PrismaClient();

const prismaPlugin: FastifyPluginAsync = fp(async (server, _opts) => {
  await prisma.$connect();
  server.log.info('[SERVER]: Database connected');

  server.decorate('prisma', prisma);
  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
    server.log.info('[SERVER]: Database disconnected');
  });
});

export default prismaPlugin;

