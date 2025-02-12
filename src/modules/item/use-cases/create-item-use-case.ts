import { randomUUID } from "node:crypto";

import { ItemTypes } from "@/core";

import { Item } from "../entities";
import { ItemRepository } from "../repositories/item-repository";

export interface CreateItemInputDTO {
  description: string;
  name: string;
  value: number;
  type: ItemTypes;
}

export class CreateItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  execute = async (data: CreateItemInputDTO) => {
    return this.createItem(data);
  };

  private createItem = async (dto: CreateItemInputDTO) => {
    const item = Item.create({ ...dto, id: randomUUID() });

    await this.itemRepository.create(item);

    return item;
  };
}
