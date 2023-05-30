import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as brandService from '../../services/brand.service';

export default async function brandController(fastify: FastifyInstance, opts: any) {
  fastify.get('/brands', async (request: FastifyRequest<{ Querystring: { products: string } }>, reply: FastifyReply) => {
    const products = request.query.products;

    let opts = false;
    if (products) opts = true;

    try {
      const brands = await brandService.getAllBrand(opts);
      reply.status(200).send(brands);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  fastify.get(
    '/brands/:id',
    async (request: FastifyRequest<{ Params: { id: string }; Querystring: { products: string } }>, reply: FastifyReply) => {
      let opts = false;
      const id = request.params.id;
      const products = request.query.products;

      if (products) opts = true;

      try {
        const brand = await brandService.getBrandById(Number(id), opts);
        reply.status(200).send(brand);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}
