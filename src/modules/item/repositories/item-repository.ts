import { Item } from "../entities";

export interface ItemRepository {
  create: (data: Item) => Promise<void>;
  list: () => Promise<Item[]>;
  get: (id: string) => Promise<Item>;
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;
}
