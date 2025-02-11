import { Item } from "../entities";
import { ItemRepository } from "./item-repository";

export class InMemoryItemRepository implements ItemRepository {
  items: Item[] = [];
  create = async (data: Item) => {
    this.items.push(data);
  };
  list: () => Promise<Item[]>;
  get: (id: string) => Promise<Item>;
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;
}
