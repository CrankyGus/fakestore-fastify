import { FastifyReply } from 'fastify';
import { prisma } from '../plugins/prisma';
import { comparePassword } from '../utils/hash';

/* eslint-disable @typescript-eslint/no-inferrable-types */
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PasswordRegex: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/;

export function validateEmail(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(expression.test(email));
  });
}

export function validatePassword(password: string): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(PasswordRegex.test(password));
  });
}

export async function validateUser(email: string, password: string, reply: FastifyReply) {
  const emailValidation = await validateEmail(email);
  const passwordValidation = await validatePassword(password);
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!emailValidation) return reply.send({ message: 'Invalid email' });

  if (!passwordValidation) return reply.send({ message: 'Invalid password' });
  if (!user) return reply.status(500).send({ message: 'Invalid credentials' });
  const compare = await comparePassword(password, user.hashpassword || '');

  if (!compare) {
    return reply.status(401).send({ message: 'Invalid credentials' });
  }

  return user;
}
