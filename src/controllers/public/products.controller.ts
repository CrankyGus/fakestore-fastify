import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as productsService from '../../services/products.service';

async function productsRoutes(server: FastifyInstance, opts: any) {
  server.get('/products', async (request: FastifyRequest<{ Querystring: { page: string; perpage: string } }>, reply: FastifyReply) => {
    const page = Number(request.query.page) || 1;
    const perpage = Number(request.query.perpage) || 10;

    try {
      const products = await productsService.getAllProducts(page, perpage);
      reply.status(200).send(products);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  server.get('/products/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const products = await productsService.getAllProducts(1, 10);

      if (!request.params.id) reply.status(200).send(products);

      const product = await productsService.getProductById(Number(request.params.id));
      reply.status(200).send(product);
    } catch (err) {
      reply.status(500).send(err);
    }
  });
}

export default productsRoutes;
