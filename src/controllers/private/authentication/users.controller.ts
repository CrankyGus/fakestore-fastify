import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as usersService from '../../../services/authentication/users.service';
import { prisma } from '../../../plugins/prisma';

export default async function usersPrivateController(fastify: FastifyInstance, opts: any) {
  fastify.get(
    '/users',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Headers: { authorization: string }; Querystring: { all: string } }>, reply: FastifyReply) => {
      try {
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;
        const all = request.query.all === 'true' ? true : false;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });

        const admin = await usersService.getAllUsers(true);

        const user = await usersService.getUserById(userId, true);

        if (adminCheck?.isAdmin && all) return reply.status(200).send(admin);

        return reply.status(200).send(user);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}
