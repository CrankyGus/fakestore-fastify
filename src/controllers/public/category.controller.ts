import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as categoriesServices from '../../services/category.service';
import { ICategory } from '../../dtos/category.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
async function categoriesRoutes(fastify: FastifyInstance, opts: any) {
  fastify.get('/categories', async (req: FastifyRequest<{ Querystring: { products: string } }>, reply: FastifyReply) => {
    let opts = false;

    if (req.query.products === 'true') {
      opts = true;
    }

    try {
      const categories = await categoriesServices.findCategory(opts);
      reply.status(200).send(categories);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  fastify.get(
    '/categories/:id',
    async (req: FastifyRequest<{ Body: ICategory; Params: { id: string }; Querystring: { products: string } }>, reply: FastifyReply) => {
      let opts = false;
      if (req.query.products === 'true') {
        opts = true;
      }
      try {
        const categories = await categoriesServices.findCategoryById(Number(req.params.id), opts);
        reply.status(200).send(categories);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}
export default categoriesRoutes;
