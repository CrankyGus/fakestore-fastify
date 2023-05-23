import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { createCategory, findCategory, findCategoryById, updateCategory, deleteCategory } from '../services/category.service';
import { ICategory } from '../dtos/category.dto';

async function categoriesRoutes(fastify: FastifyInstance, opts: any) {
  fastify.get('/categories', async (req: FastifyRequest<{Querystring:  { products: string }}>, reply: FastifyReply) => {
    
    let opts = false

    if(req.query.products === 'true') {
      opts = true
    }
    
    try {
      const categories = await findCategory(opts);
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
        const categories = await findCategoryById(Number(req.params.id), opts);
        reply.status(200).send(categories);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );

  fastify.post('/categories', async (req: FastifyRequest<{ Body: ICategory }>, reply: FastifyReply) => {
    try {
      const category = await createCategory(req.body);
      reply.status(201).send(category);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  fastify.patch('/categories/:id', async (req: FastifyRequest<{ Body: ICategory; Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const category = await updateCategory(Number(req.params.id), req.body);
      reply.status(200).send(category);
    } catch (err) {
      reply.status(500).send(err);
    }
  
  })

  fastify.delete('/categories/:id', async (req: FastifyRequest<{ Body: ICategory; Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const category = await deleteCategory(Number(req.params.id));
      reply.status(200).send(category);
    } catch (err) {
      reply.status(500).send(err);
    }
  
  })

}
export default categoriesRoutes;
