import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ICategory } from '../../dtos/category.dto';
import * as categoriesServices from '../../services/category.service';
import { prisma } from '../../plugins/prisma';

async function categoriesPrivateRoutes(fastify: FastifyInstance, opts: any) {
  fastify.post(
    '/categories',
    { preValidation: [fastify.authenticate] },
    async (req: FastifyRequest<{ Body: ICategory; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        if (adminCheck?.isAdmin === false) {
          return reply.status(401).send({ message: 'Unauthorized' });
        }

        const category = await categoriesServices.createCategory(req.body);
        reply.status(201).send(category);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );

  fastify.patch(
    '/categories/:id',
    { preValidation: [fastify.authenticate] },
    async (req: FastifyRequest<{ Body: ICategory; Params: { id: string }; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        if (adminCheck?.isAdmin === false) {
          return reply.status(401).send({ message: 'Unauthorized' });
        }
        const category = await categoriesServices.updateCategory(Number(req.params.id), req.body);
        reply.status(200).send(category);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );

  fastify.delete(
    '/categories/:id',
    { preValidation: [fastify.authenticate] },
    async (req: FastifyRequest<{ Body: ICategory; Params: { id: string }; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        if (adminCheck?.isAdmin === false) {
          return reply.status(401).send({ message: 'Unauthorized' });
        }
        const category = await categoriesServices.deleteCategory(Number(req.params.id));
        reply.status(200).send(category);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}
export default categoriesPrivateRoutes;
