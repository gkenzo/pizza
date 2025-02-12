import { randomInt } from "node:crypto";

import { faker } from "@faker-js/faker";
import { describe, it } from "vitest";

import { PrismaItemRepository } from "@/infra/database/prisma";
import { CreateItemUseCase } from "@/modules/item/use-cases/create-item.use-case";

describe("Test database connection", () => {
  const itemRepository = new PrismaItemRepository();
  const createItemUseCase = new CreateItemUseCase(itemRepository);
  it("Should be able to create an item in database", async () => {
    await createItemUseCase.execute({
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });
  });
});
