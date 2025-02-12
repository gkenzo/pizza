import { faker } from "@faker-js/faker";
import { beforeEach, describe, it } from "vitest";

import { ItemTypes } from "@/core";

import { InMemoryItemRepository } from "../../repositories";
import { CreateItemInputDTO, CreateItemUseCase } from "../create-item.use-case";

describe("Create item", () => {
  let sut: CreateItemUseCase;

  beforeEach(() => {
    const repository = new InMemoryItemRepository();
    sut = new CreateItemUseCase(repository);
  });

  it("Should be able to create a item with valid props", async () => {
    const dto: CreateItemInputDTO = {
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: Number(faker.commerce.price()),
      type: ItemTypes.pizza
    };

    await sut.execute(dto);
  });
});
