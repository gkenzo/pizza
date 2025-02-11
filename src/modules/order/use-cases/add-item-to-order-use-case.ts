import { isEmpty } from "radash";

import { ItemRepository } from "@/modules/item/repositories";

import { OrderRepository } from "../repositories";

export interface AddItemToOrderInputDTO {
  itemId: string;
  orderId: string;
}

export class AddItemToOrderUseCase {
  constructor(private itemRepository: ItemRepository, private orderRepository: OrderRepository) {}

  execute = async (dto: AddItemToOrderInputDTO) => {
    const { valid, missingInputs } = this.validDto(dto);
    if (!valid) throw new Error(`Missing crucial information: ${missingInputs.join()}`);

    const [item, order] = await Promise.all([
      this.itemRepository.get(dto.itemId),
      this.orderRepository.get(dto.orderId)
    ]);

    if (isEmpty(order)) throw new Error("Informed order does not exists");
    if (isEmpty(item)) throw new Error("Informed item does not exists");

    order.addItem(item);

    await this.orderRepository.update(order);
  };

  private validDto = (dto: AddItemToOrderInputDTO) => {
    const response = {
      valid: true,
      missingInputs: []
    };

    if (isEmpty(dto?.itemId)) {
      response.valid = false;
      response.missingInputs.push("itemId");
    }

    if (isEmpty(dto?.orderId)) {
      response.valid = false;
      response.missingInputs.push("orderId");
    }

    return response;
  };
}
