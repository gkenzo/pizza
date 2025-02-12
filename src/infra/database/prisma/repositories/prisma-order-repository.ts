import { Order } from "@/modules/order";
import { OrderRepository } from "@/modules/order/repositories";

import { prisma } from "../client";
import { PrismaOrderMapper } from "../mappers";

export class PrismaOrderRepository implements OrderRepository {
  create = async (data: Order): Promise<void> => {
    await prisma.order.create({
      data: PrismaOrderMapper.toPrisma(data)
    });
  };
  list: () => Promise<Order[]>;
  get = async (id: string): Promise<Order> => {
    const rawOrder = await prisma.order.findFirst({ where: { id }, include: { items: true, user: true } });

    return PrismaOrderMapper.toEntity(rawOrder);
  };
  update = async (data: Order): Promise<void> => {
    prisma.order.update({
      where: { id: data.id },
      data: {
        items: {
          connect: data.items.map(item => ({
            id: item.id
          }))
        },
        shippingCost: data.shippingCost,
        status: data.status,
        totalValue: data.totalValue,
        updatedAt: data.updatedAt,
        value: data.value
      }
    });
  };
}
