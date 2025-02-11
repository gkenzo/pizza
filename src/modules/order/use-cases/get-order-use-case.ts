import { OrderRepository } from "../repositories";

interface GetOrderInputDTO {
  orderId: string;
  userId?: string;
  isAdmin?: boolean;
}

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  execute = async (dto: GetOrderInputDTO) => {
    const order = await this.orderRepository.get(dto.orderId);

    if (!order || (!dto.isAdmin && order?.userId !== dto.userId))
      throw new Error(`Order does not exists or belongs to user ${dto.userId}`);

    return order;
  };
}
