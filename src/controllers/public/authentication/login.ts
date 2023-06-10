import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from '../../../dtos/user.dto';
import { validateUser } from '../../../helpers/validator';
import { User } from '@prisma/client';

export default async function loginRoute(server: FastifyInstance, opts: any) {
  server.post('/login', async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) => {
    try {
      const { email, password } = request.body;

      const user: User = await validateUser(email, password, reply);

      const token = server.jwt.sign({ userId: user.id, email: user.email }, { expiresIn: '1h' });

      return reply
        .setCookie('token', token, { path: '/', httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000) })
        .send({ user, token });
    } catch (error) {
      reply.status(500).send({ message: 'Error logging in', error: error });
    }
  });
  server.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await reply.clearCookie('token', { sameSite: 'none', secure: true }).send({ message: 'Logged out' });
    } catch (error) {
      reply.status(500).send({ message: 'Error logging out', error: error });
    }
  });
}
