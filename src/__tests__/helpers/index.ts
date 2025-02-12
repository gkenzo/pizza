import { randomInt, randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";

import { Item } from "@/modules/item/entities";
import { ItemRepository } from "@/modules/item/repositories";

export const createItem = async (itemRepository: ItemRepository) => {
  const item = Item.create({
    id: randomUUID(),
    description: faker.commerce.productDescription(),
    name: faker.commerce.productName(),
    value: randomInt(1000),
    type: "Pizza"
  });

  await itemRepository.create(item);

  return item;
};
