import { Item } from "../entities";
import { ItemRepository } from "./item-repository";

export class InMemoryItemRepository implements ItemRepository {
  items: Item[] = [];
  create = async (data: Item) => {
    this.items.push(data);
  };
  list: () => Promise<Item[]>;
  get = async (id: string): Promise<Item> => {
    return this.items.find(item => item.id === id);
  };
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;
}
