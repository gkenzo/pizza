import { randomUUID } from "node:crypto";

import { Item } from "@/modules/item/entities";
import { Order } from "@/modules/order";

import { OrderRepository } from "../repositories";

export interface CreateOrderInputDTO {
  userId: string;
  items: Item[];
  shippingCost?: number;
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  execute = async (dto: CreateOrderInputDTO) => {
    return this.createOrder(dto);
  };

  createOrder = async (dto: CreateOrderInputDTO) => {
    const order = Order.create({
      id: randomUUID(),
      createdAt: new Date(),
      shippingCost: dto.shippingCost || 0,
      items: dto.items,
      userId: dto.userId
    });
    await this.orderRepository.create(order);

    return order;
  };
}
