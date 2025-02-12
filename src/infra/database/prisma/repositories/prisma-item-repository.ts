import { Item } from "@/modules/item/entities";
import { ItemRepository } from "@/modules/item/repositories";

import { prisma } from "../client";
import { PrismaItemMapper } from "../mappers";

export class PrismaItemRepository implements ItemRepository {
  list: () => Promise<Item[]>;
  get = async (id: string): Promise<Item> => {
    const rawData = await prisma.item.findFirst({ where: { id } });

    return PrismaItemMapper.toEntity(rawData);
  };
  delete: (id: string) => Promise<void>;
  update: (id: string) => Promise<void>;
  create = async (data: Item): Promise<void> => {
    await prisma.item.create({
      data: PrismaItemMapper.toPrisma(data)
    });
  };
}
