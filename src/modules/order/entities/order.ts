import { isEmpty } from "radash";

import { Entity } from "@/core";
import { Item } from "@/modules/item/entities";

export interface OrderProps {
  id: string;
  userId: string;
  items: Item[];
  shippingCost?: number;
  value?: number;
  totalValue?: number;
  createdAt?: Date;
  updatedAt?: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status?: any;
}

export class Order extends Entity<OrderProps> {
  get id() {
    return this.props.id;
  }
  set id(value: string) {
    this.props.id = value;
  }
  get userId() {
    return this.props.userId;
  }
  set userId(value: string) {
    this.props.userId = value;
  }
  get items() {
    return this.props.items;
  }
  set items(value: Item[]) {
    this.props.items = value;
  }
  get shippingCost() {
    return this.props.shippingCost || 0;
  }
  set shippingCost(value: number) {
    this.props.shippingCost = value;
  }
  get value() {
    return this.props.items.reduce((total, obj) => total + obj.value, 0);
  }
  get totalValue() {
    return this.value + this.shippingCost;
  }
  static create(props: OrderProps) {
    if (!props.items || isEmpty(props.items)) throw new Error("Cannot create a order without items");
    const order = new Order({ ...props });

    return order;
  }
}
