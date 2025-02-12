import { item as PrismaItem, order as PrismaOrder, Prisma } from "@prisma/client";

import { OrderStatus } from "@/core/enums/order-status";
import { Item } from "@/modules/item/entities";
import { Order } from "@/modules/order";

type PrismaToEntity = PrismaOrder & {
  items: PrismaItem[];
  userId: string;
};

export class PrismaOrderMapper {
  static toEntity(order: PrismaToEntity): Order {
    return Order.create({
      id: order.id,
      items: order.items.map(item =>
        Item.create({
          id: item.id,
          description: item.description,
          name: item.name,
          type: item.type,
          value: item.value
        })
      ),
      userId: order.userId,
      createdAt: order.createdAt,
      shippingCost: order.shippingCost,
      status: order.status as OrderStatus,
      totalValue: order.totalValue,
      updatedAt: order.updatedAt,
      value: order.value
    });
  }

  static toPrisma(order: Order): Prisma.orderUncheckedCreateInput {
    return {
      shippingCost: order?.shippingCost,
      totalValue: order?.totalValue,
      updatedAt: order?.updatedAt,
      value: order?.value,
      createdAt: order?.createdAt,
      id: order?.id,
      items: {
        connect: order?.items.map(item => ({
          id: item.id
        }))
      },
      status: order?.status,
      userId: order?.userId
    };
  }
}
