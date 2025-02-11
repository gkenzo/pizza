import { Order } from "../entities";
import { OrderRepository } from "./order-repository";

export class InMemoryOrderRepository implements OrderRepository {
  orders: Order[] = [];
  list: () => Promise<Order[]>;
  get = async (id: string): Promise<Order> => {
    return this.orders.find(order => order.id === id);
  };
  delete: (id: string) => Promise<void>;
  update = async (data: Order): Promise<void> => {
    const index = this.orders.findIndex(order => order.id === data.id);
    this.orders[index] = data;
  };
  create = async (data: Order): Promise<void> => {
    this.orders.push(data);
  };
}
