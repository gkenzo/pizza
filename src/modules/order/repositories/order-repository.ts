import { Order } from "../entities";

export interface OrderRepository {
  create(data: Order): Promise<void>;
  list: () => Promise<Order[]>;
  get: (id: string) => Promise<Order>;
  update: (data: Order) => Promise<void>;
}
