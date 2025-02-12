import { ItemRepository } from "../repositories/item-repository";

export class GetItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  execute = async (id: string) => {
    return this.itemRepository.get(id);
  };
}
