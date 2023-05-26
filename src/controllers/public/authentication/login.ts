import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from '../../../dtos/user.dto';
import { validateUser } from '../../../helpers/validator';
import { User } from '@prisma/client';

export default async function loginRoute(server: FastifyInstance, opts: any) {
  server.post('/login', async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) => {
    try {
      const { email, password } = request.body;

      const user: User = await validateUser(email, password, reply);

      const token = server.jwt.sign({ userId: user });

      return reply.header('set-cookie', token).send({ user, token });
    } catch (error) {
      reply.status(500).send({ message: 'Error logging in', error: error });
    }
  });
}
