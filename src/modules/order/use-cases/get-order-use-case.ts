import { OrderRepository } from "../repositories";

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  execute(orderId: string) {
    return this.orderRepository.get(orderId);
  }
}
