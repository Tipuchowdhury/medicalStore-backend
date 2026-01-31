import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { createOrderData } from "../../types/types";

const createOrder = async (items: createOrderData[], customerId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        customerId: customerId,
        status: OrderStatus.PENDING,
        totalAmount: 0,
      },
    });
    let total = 0;
    for (const item of items) {
      const medicine = await tx.medicine.findUnique({
        where: {
          id: item.medicineId,
        },
      });
      if (!medicine) {
        throw new Error("Medicine not found");
      }
      if (medicine.quantity < item.quantity) {
        throw new Error("Insufficient funds");
      }

      const price = item.quantity * medicine.price;
      total += price;

      await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          medicineId: medicine.id,
          quantity: item.quantity,
          price: medicine.price,
        },
      });

      await tx.medicine.update({
        where: {
          id: medicine.id,
        },
        data: {
          quantity: { decrement: item.quantity },
        },
      });
    }
    await tx.order.update({
      where: {
        id: newOrder.id,
      },
      data: {
        totalAmount: total,
        status: "CONFIRMED",
      },
    });
  });
  return result;
};

const getOrder = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId,
    },
  });
  return result;
};

const getOrderById = async (orderId: string, customerId: string) => {
  const result = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });
  return result;
};

const getSellerOrders = async (sellerId: string) => {
  const result = prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: sellerId,
          },
        },
      },
    },
    include: {
      items: {
        where: {
          medicine: {
            sellerId: sellerId,
          },
        },
        include: {
          medicine: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const orderService = {
  createOrder,
  getOrder,
  getOrderById,
  getSellerOrders,
};
