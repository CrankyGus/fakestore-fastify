import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as brandService from '../../services/brand.service';
import { IBrand } from '../../dtos/brand.dto';
import { prisma } from '../../plugins/prisma';

export default async function brandPrivateController(fastify: FastifyInstance, opts: any) {
  fastify.post(
    '/brands',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Body: IBrand; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        if (!adminCheck?.isAdmin) return reply.status(401).send({ message: 'Unauthorized' });

        const brand = await brandService.createBrand(request.body);

        reply.status(201).send(brand);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );

  fastify.patch(
    '/brands/:id',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Params: { id: string }; Body: IBrand; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        if (!adminCheck?.isAdmin) return reply.status(401).send({ message: 'Unauthorized' });

        const { id } = request.params;
        const brand = await brandService.updateBrand(Number(id), request.body);

        reply.status(200).send(brand);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );

  fastify.delete(
    '/brands/:id',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Params: { id: string }; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        if (!adminCheck?.isAdmin) return reply.status(401).send({ message: 'Unauthorized' });

        const { id } = request.params;
        const brand = await brandService.deleteBrand(Number(id));
        reply.status(200).send(brand);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}
