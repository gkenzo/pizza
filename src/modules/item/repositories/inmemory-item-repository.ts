import { Item, ItemProps } from "../entities";
import { ItemRepository } from "./item-repository";

export class InMemoryItemRepository implements ItemRepository {
  items: ItemProps[] = [];
  create = async (data: Item) => {
    this.items.push(data.toJson());
  };
  list: () => Promise<Item[]>;
  get = async (id: string): Promise<Item> => {
    return Item.create(this.items.find(item => item.id === id));
  };
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;
}
