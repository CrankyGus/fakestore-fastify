import { IOrder } from '../dtos/order.dto';
import { IOrderDetail } from '../dtos/orderDetail.dto';
import { prisma } from '../plugins/prisma';

interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  limit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

async function createOrder(order: IOrder, userId: number, orderDetail?: IOrderDetail) {
  try {
    const orders = await prisma.order.create({
      data: {
        users: {
          connect: {
            id: userId
          }
        },
        status: order.status,
        orderDetail: {
          // connectOrCreate: {
          //   create: {
          //     productId: orderDetail?.productId || 1,
          //     discount: orderDetail?.orderDetailDiscount || 0,
          //     quantity: orderDetail?.orderDetailQuantity || 1
          //   },
          //   where: {
          //     orderId: orderDetail?.orderDetailId
          //   }
          create: {
            productId: orderDetail?.productId || 1,
            discount: orderDetail?.orderDetailDiscount || 0,
            quantity: orderDetail?.orderDetailQuantity || 1
          }
        }
      }
    });

    return orders;
  } catch (err) {
    return { message: 'Something went wrong!', err };
  }
}

// async function getOrderById(orderId: number) {
//   try {
//     const orders = await prisma.order.findUnique({
//       where: {
//         id: orderId
//       },
//       include: {
//         orderDetail: true
//       }
//     });
//     return orders;
//   } catch (err) {
//     return { massage: 'Something went wrong!', err };
//   }
// }

async function getAllOrders(page: number, pageSize: number) {
  try {
    const totalItems = await prisma.order.count();
    const totalPages = Math.ceil(totalItems / pageSize);

    const orders = await prisma.order.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        orderDetail: true
      }
    });

    const result: IPagination = {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: pageSize,
      limit: totalItems,
      data: orders
    };
    return result;
  } catch (err) {
    return { message: 'Something went wrong!', err };
  }
}

async function updateOrder(order: IOrder) {
  try {
    const orders = await prisma.order.update({
      where: { id: order.orderId },
      data: {
        status: order.status
      }
    });
    return orders;
  } catch (err) {
    return { message: 'Something went wrong!', err };
  }
}

export { updateOrder, getAllOrders, createOrder };
