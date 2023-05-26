import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from '../../../dtos/user.dto';
import * as userService from '../../../services/authentication/users.service';
import { prisma } from '../../../plugins/prisma';
import { validateEmail, validatePassword } from '../../../helpers/validator';

export default async function registerRoute(server: FastifyInstance, opts: any) {
  server.post('/register', async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) => {
    try {
      //   const { email, password, ...rest } = request.body;
      const emailValidation = await validateEmail(request.body.email);
      const passwordValidation = await validatePassword(request.body.password);
      const userExist = await prisma.user.findUnique({
        where: { email: request.body.email }
      });

      if (userExist) {
        return reply.status(404).send({ message: 'User already exist' });
      }

      if (!emailValidation) {
        return reply.status(401).send({ message: 'Invalid email' });
      }

      if (!passwordValidation) {
        return reply.status(401).send({ message: 'Invalid password' });
      }

      const user = await userService.createUser(request.body);
      reply.send({ user, message: 'User registered successfully' });
    } catch (error) {
      reply.status(500).send(error);
    }
  });
}
