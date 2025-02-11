import { Entity } from "@/core";

export interface ItemProps {
  id: string;
  description: string;
  name: string;
  value: number;
}

export class Item extends Entity<ItemProps> {
  static create(props) {
    const item = new Item({ ...props });

    return item;
  }
}
