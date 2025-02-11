import { Order } from "../entities";
import { OrderRepository } from "./order-repository";

export class inMemoryOrderRepository implements OrderRepository {
  orders: Order[] = [];
  list: () => Promise<Order[]>;
  get = async (id: string): Promise<Order> => {
    return this.orders.find(order => order.id === id);
  };
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;

  create = async (data: Order): Promise<void> => {
    this.orders.push(data);
  };
}
