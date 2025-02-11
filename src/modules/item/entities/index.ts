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
  set id(value: string) {
    this.props.id = value;
  }
  get description() {
    return this.props.description;
  }
  set description(value: string) {
    this.props.description = value;
  }
  get name() {
    return this.props.name;
  }
  set name(value: string) {
    this.props.name = value;
  }
  get value() {
    return this.props.value;
  }
  set value(value: number) {
    this.props.value = value;
  }
  static create(props: ItemProps) {
    const item = new Item({ ...props });

    return item;
  }
}
