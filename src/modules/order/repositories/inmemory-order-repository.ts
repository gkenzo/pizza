import { Order } from "../entities";
import { OrderRepository } from "./order-repository";

export class inMemoryOrderRepository implements OrderRepository {
  orders: Order[] = [];

  create = async (data: Order): Promise<void> => {
    this.orders.push(data);
  };
}
