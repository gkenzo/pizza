import { ItemRepository } from "../repositories/item-repository";

export class ListItemUseCase {
  constructor(private itemRepository: ItemRepository) {}

  execute = async () => {
    return this.itemRepository.list();
  };
}
