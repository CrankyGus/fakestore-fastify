import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import * as productsService from '../../services/products.service';
import { IProduct } from "../../dtos/product.dto";




async function productsPrivateController(server:FastifyInstance, opts:any){
    server.post('/products', async (request:FastifyRequest<{Body: IProduct}>, reply:FastifyReply) => {
       try {
        const products = await productsService.createProduct(request.body);
        reply.status(201).send(products);
       } catch (err) {
        reply.status(500).send({
            message: 'Internal Server Error'
        })
       
       }
    })

    server.patch('/products/:id', async (request:FastifyRequest<{Body: IProduct,Params: {id:string}}>, reply:FastifyReply) => {
        try {
            const products = await productsService.updateProduct(Number(request.params.id), request.body);
            reply.status(200).send(products);
        } catch (err) {
            reply.status(500).send(err)
        }
    })

    server.delete('/products/:id', async (request:FastifyRequest<{Params: {id:string}}>, reply:FastifyReply) => {
        try {
            const products = await productsService.deleteProduct(Number(request.params.id));
            reply.status(200).send(products);
        } catch (err) {
            reply.status(500).send(err)
        }
    
    })
}