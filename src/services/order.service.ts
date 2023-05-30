import { IOrder } from '../dtos/order.dto';
import { IOrderDetail } from '../dtos/orderDetail.dto';
import { prisma } from '../plugins/prisma';

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

async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderDetail: true
      }
    });
    return orders;
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
