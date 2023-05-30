/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as orderService from '../../services/order.service';
import { prisma } from '../../plugins/prisma';
import { IOrder } from '../../dtos/order.dto';
import { IOrderDetail } from '../../dtos/orderDetail.dto';
import { Order } from '@prisma/client';

export default async function orderPrivateController(fastify: FastifyInstance, opts: any) {
  fastify.get(
    '/orders',
    { preValidation: [fastify.authenticate] },
    async (request: FastifyRequest<{ Headers: { authorization: string }; Querystring: { all: string } }>, reply: FastifyReply) => {
      try {
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;
        const all = request.query.all === 'true' ? true : false;

        const adminCheck = await prisma.user.findUnique({
          where: {
            id: Number(userId)
          }
        });
        const orders: any = await orderService.getAllOrders();

        const orderFilter = orders.filter((order: Order) => order.userId === Number(userId));

        if (adminCheck?.isAdmin && all) reply.status(200).send(orders);

        reply.status(200).send(orderFilter);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
  fastify.post(
    '/orders',
    { preValidation: [fastify.authenticate] },
    async (
      request: FastifyRequest<{ Body: { order: IOrder; detail: IOrderDetail }; Headers: { authorization: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const orders = request.body.order;
        const details = request.body.detail;
        const auth = request.headers.authorization;
        const token = auth.split(' ')[1];
        const decodedToken: any = fastify.jwt.decode(token);
        const { userId } = decodedToken;

        const order = await orderService.createOrder(orders, Number(userId), details);
        reply.status(201).send(order);
      } catch (err) {
        reply.status(500).send(err);
      }
    }
  );
}
