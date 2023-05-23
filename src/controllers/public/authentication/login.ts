// import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// import { IUser } from '../../../dtos/user.dto';
// import { prisma } from '../../../plugins/prisma';
// import { validateEmail, validatePassword } from '../../../helpers/validator';
// import { comparePassword } from '../../../utils/hash';

// export default async function loginRoute(server: FastifyInstance, opts: any) {
//   server.post('/login', async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) => {
//     try {
//       const { email, password, ...rest } = request.body;
//       const emailValidation = await validateEmail(request.body.email);
//       const passwordValidation = await validatePassword(request.body.password);

//       const user = await prisma.user.findUnique({
//         where: { email: email }
//       });

//       const compare = await comparePassword(password, user?.hashpassword || '');

//       const userExist = await prisma.user.findUnique({
//         where: { email: request.body.email }
//       });

//       if (!userExist) {
//         return reply.status(401).send({ message: 'Invalid credentials' });
//       }

//       if (!emailValidation) {
//         return reply.status(401).send({ message: 'Invalid email' });
//       }

//       if (!passwordValidation) {
//         return reply.status(401).send({ message: 'Invalid password' });
//       }

//       if (!compare) {
//         return reply.status(401).send({ message: 'Invalid credentials' });
//       }

//       const token = server.jwt.sign({ userId: user?.id });

//       return reply.header('set-cookie', token).send({ user, token });

//     } catch (error) {
//       reply.status(500).send({ message: 'Error logging in' ,error:error});
//     }
//   });
// }

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IUser } from '../../../dtos/user.dto';
import { prisma } from '../../../plugins/prisma';
import { validateEmail, validatePassword } from '../../../helpers/validator';
import { comparePassword } from '../../../utils/hash';

export default async function loginRoute(server: FastifyInstance, opts: any) {
  server.post('/login', async (request: FastifyRequest<{ Body: IUser }>, reply: FastifyReply) => {
    // try {
      const { email, password, ...rest } = request.body;
      const emailValidation = await validateEmail(email);
      const passwordValidation = await validatePassword(password);

      const user = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!user) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }

      const compare = await comparePassword(password, user.hashpassword || '');

      if (!emailValidation) {
        return reply.status(401).send({ message: 'Invalid email' });
      }

      if (!passwordValidation) {
        return reply.status(401).send({ message: 'Invalid password' });
      }

      if (!compare) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }

      const token = server.jwt.sign({ userId: user.id });

      return reply.header('set-cookie', token).send({ user, token });

    // } catch (error) {
    //   reply.status(500).send({ message: 'Error logging in', error: error });
    // }
  });
}
