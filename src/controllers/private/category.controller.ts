import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ICategory } from "../../dtos/category.dto";
import * as categoriesServices from "../../services/category.service";

async function categoriesPrivateRoutes(fastify: FastifyInstance, opts: any) {
    fastify.post('/categories', async (req: FastifyRequest<{ Body: ICategory }>, reply: FastifyReply) => {
        try {
          const category = await categoriesServices.createCategory(req.body);
          reply.status(201).send(category);
        } catch (err) {
          reply.status(500).send(err);
        }
      });
    
      fastify.patch('/categories/:id', async (req: FastifyRequest<{ Body: ICategory; Params: { id: string } }>, reply: FastifyReply) => {
        try {
          const category = await categoriesServices.updateCategory(Number(req.params.id), req.body);
          reply.status(200).send(category);
        } catch (err) {
          reply.status(500).send(err);
        }
      });
    
      fastify.delete('/categories/:id', async (req: FastifyRequest<{ Body: ICategory; Params: { id: string } }>, reply: FastifyReply) => {
        try {
          const category = await categoriesServices.deleteCategory(Number(req.params.id));
          reply.status(200).send(category);
        } catch (err) {
          reply.status(500).send(err);
        }
      });
}
export  default categoriesPrivateRoutes;