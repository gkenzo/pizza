import { randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { Item } from "@/modules/item/entities";
import { Order } from "@/modules/order";
import { inMemoryOrderRepository } from "@/modules/order/repositories";

import { CreateOrderUseCase } from "../create-order-use-case";
describe("Create order", () => {
  let sut: CreateOrderUseCase;

  beforeEach(() => {
    const repository = new inMemoryOrderRepository();
    sut = new CreateOrderUseCase(repository);
  });
  it("Should be able to create order with valid props", async () => {
    const item = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName()
    });

    const dto = {
      userId: randomUUID(),
      items: [item]
    };

    const order = await sut.execute(dto);

    expect(order).toBeDefined();
    expect(order).toBeInstanceOf(Order);
    expect(order.userId).toBe(dto.userId);
    expect(order.id).toBeTypeOf("string");
  });
});
