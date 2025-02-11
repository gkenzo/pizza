import { Entity } from "@/core";

export interface OrderProps {
  id: string;
  userId: string;
  items: [];
  shippingCost: number;
  value: number;
  totalValue: number;
  createdAt?: Date;
  updatedAt?: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status?: any;
}

export class Order extends Entity<OrderProps> {
  get id() {
    return this.props.id;
  }
  get userId() {
    return this.props.userId;
  }
  get items() {
    return this.props.items;
  }
  get shippingCost() {
    return this.props.shippingCost;
  }
  get value() {
    return this.props.value;
  }
  get totalValue() {
    return this.props.totalValue;
  }
  static create(props) {
    const order = new Order({ ...props });

    return order;
  }
}
