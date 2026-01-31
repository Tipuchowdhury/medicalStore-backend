import { OrderItemStatus, OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { updateOrderItemType } from "../../types/types";

const updateOrderItemStatus = async (
  orderItemId: string,
  sellerId: string,
  data: updateOrderItemType,
) => {
  const orderItem = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    include: {
      medicine: true,
    },
  });
  console.log(orderItem);
  console.log(data);
  if (!orderItem) {
    throw new Error("Order item not found");
  }

  if (orderItem.medicine.sellerId !== sellerId) {
    throw new Error("Unauthorized");
  }

  const updatedItem = await prisma.orderItem.update({
    where: { id: orderItemId },
    data,
  });

  await syncOrderStatus(orderItem.orderId);

  return updatedItem;
};

const syncOrderStatus = async (orderId: string) => {
  const items = await prisma.orderItem.findMany({
    where: { orderId },
  });

  const statuses = items.map((item) => item.status);

  let orderStatus: OrderStatus = "PENDING";

  if (statuses.every((s) => s === "DELIVERED")) {
    orderStatus = "DELIVERED";
  } else if (statuses.some((s) => s === "SHIPPED")) {
    orderStatus = "SHIPPED";
  } else if (statuses.every((s) => s === "CANCELLED")) {
    orderStatus = "CANCELLED";
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: orderStatus },
  });
};

export const orderItemService = {
  updateOrderItemStatus,
};
