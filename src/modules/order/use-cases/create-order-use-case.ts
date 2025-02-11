import { randomUUID } from "node:crypto";

import { Item } from "@/modules/item/entities";
import { Order } from "@/modules/order";

import { OrderRepository } from "../repositories";

interface CreateOrderInputDTO {
  userId: string;
  items: Item[];
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  execute = async (dto: CreateOrderInputDTO) => {
    return this.createOrder(dto);
  };

  createOrder = async (dto: CreateOrderInputDTO) => {
    const order = Order.create({ id: randomUUID(), ...dto });
    await this.orderRepository.create(order);

    return order;
  };
}
