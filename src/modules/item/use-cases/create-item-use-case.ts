import { Item } from "../entities";
import { ItemRepository } from "../repositories/item-repository";

export interface CreateItemInputDTO {
  description: string;
  name: string;
  value: number;
}

export class CreateItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  execute = async (data: CreateItemInputDTO) => {
    return this.createItem(data);
  };

  createItem = async (dto: CreateItemInputDTO) => {
    const item = await this.itemRepository.create(Item.create(dto));

    return item;
  };
}
