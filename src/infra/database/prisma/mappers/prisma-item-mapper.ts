import { item as PrismaItem, Prisma } from "@prisma/client";

import { Item } from "@/modules/item/entities";
export class PrismaItemMapper {
  static toEntity(item: PrismaItem): Item {
    return Item.create({
      id: item.id,
      description: item.description,
      name: item.name,
      value: item.value,
      type: item.type
    });
  }
  static toPrisma = (item: Item): Prisma.itemUncheckedCreateInput => {
    return {
      id: item.id,
      description: item.description,
      name: item.name,
      value: item.value,
      type: item.type
    };
  };
}
