import { Order } from "../entities";

export interface OrderRepository {
  create(data: Order): Promise<void>;
}
