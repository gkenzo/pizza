import { randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";
import { beforeEach, describe, it } from "vitest";

import { Item } from "@/modules/item/entities";

import { inMemoryOrderRepository, OrderRepository } from "../../repositories";
import { CreateOrderUseCase } from "../create-order-use-case";
import { GetOrderUseCase } from "../get-order-use-case";

describe("Get Order", () => {
  let sut: GetOrderUseCase;
  let repository: OrderRepository;
  beforeEach(() => {
    repository = new inMemoryOrderRepository();
    sut = new GetOrderUseCase(repository);
  });

  it("Should be able to get an order", async () => {
    const item = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName()
    });

    const dto = {
      userId: randomUUID(),
      items: [item]
    };

    const createOrderUseCase = new CreateOrderUseCase(repository);

    const createdOrder = await createOrderUseCase.execute(dto);

    await sut.execute(createdOrder.id);
  });
});
