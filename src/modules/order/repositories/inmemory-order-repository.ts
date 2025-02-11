import { Order, OrderProps } from "../entities";
import { OrderRepository } from "./order-repository";

export class InMemoryOrderRepository implements OrderRepository {
  orders: OrderProps[] = [];
  list: () => Promise<Order[]>;
  get = async (id: string): Promise<Order> => {
    return Order.create(this.orders.find(order => order.id === id));
  };
  delete: (id: string) => Promise<void>;
  update = async (data: Order): Promise<void> => {
    const index = this.orders.findIndex(order => order.id === data.id);
    this.orders[index] = data.toJson();
  };
  create = async (data: Order): Promise<void> => {
    this.orders.push(data.toJson());
  };
}
