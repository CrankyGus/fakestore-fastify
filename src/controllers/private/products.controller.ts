import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as productsService from '../../services/products.service';
import { IProduct } from '../../dtos/product.dto';
import { prisma } from '../../plugins/prisma';

async function productsPrivateRoutes(fastify: FastifyInstance, opts: any) {
  fastify.post(
    '/products',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Body: IProduct; Headers: { authorization: string } }>, reply: FastifyReply) => {
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

        if (adminCheck?.isAdmin === false) {
          return reply.status(401).send({ message: 'Unauthorized' });
        }
        const products = await productsService.createProduct(request.body);
        reply.status(201).send(products);
      } catch (err) {
        reply.status(500).send({
          message: 'Internal Server Error',
          error: err
        });
      }
    }
  );

  fastify.patch(
    '/products/:id',
    { preValidation: [fastify.authenticate] },
    async (
      request: FastifyRequest<{ Body: IProduct; Params: { id: string }; Headers: { authorization: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const products = await productsService.updateProduct(Number(request.params.id), request.body);
        reply.status(200).send(products);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );

  fastify.delete(
    '/products/:id',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Params: { id: string }; Headers: { authorization: string } }>, reply: FastifyReply) => {
      try {
        const products = await productsService.deleteProduct(Number(request.params.id));
        reply.status(200).send(products);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}

export default productsPrivateRoutes;
