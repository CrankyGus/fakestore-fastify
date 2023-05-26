import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';
import dotenv from 'dotenv';
dotenv.config();

const authPlugin = fp(async function (fastify, opts) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string
  });

  fastify.decorate('authenticate', async function (request: FastifyRequest<{ Headers: { authorization: string } }>, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized' });
    }
  });
});

export default authPlugin;
