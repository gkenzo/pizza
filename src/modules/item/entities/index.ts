import { Entity } from "@/core";

export interface ItemProps {
  id: string;
  description: string;
  name: string;
  value: number;
}

export class Item extends Entity<ItemProps> {
  get id() {
    return this.props.id;
  }
  get description() {
    return this.props.description;
  }
  get name() {
    return this.props.name;
  }
  get value() {
    return this.props.value;
  }
  static create(props) {
    const item = new Item({ ...props });

    return item;
  }
}
