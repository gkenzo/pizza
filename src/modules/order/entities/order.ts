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
  status?: string;
}

export class Order extends Entity<OrderProps> {
  get id() {
    return this.props.id;
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
    return this.props.shippingCost;
  }
  set shippingCost(value: number) {
    this.props.shippingCost = value;
  }
  get value() {
    return this.calculateItemsValue();
  }
  get totalValue() {
    return this.calculateItemsValue() + this.props.shippingCost;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }
  get status() {
    return this.props.status;
  }
  set status(value: string) {
    this.props.status = value;
  }
  private calculateItemsValue = () => {
    return this.props.items.reduce((total, obj) => total + obj.value, 0);
  };
  addItem = (item: Item) => {
    this.updatedAt = new Date();

    return this.props.items.push(item);
  };
  static create(props: OrderProps) {
    if (!props.items || isEmpty(props.items)) throw new Error("Cannot create an order without items");

    if (!props.shippingCost) props.shippingCost = 0;
    const order = new Order({ ...props });

    return order;
  }
}
