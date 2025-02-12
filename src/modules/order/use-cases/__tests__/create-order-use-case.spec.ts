import { randomInt, randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { ItemTypes } from "@/core";
import { Item } from "@/modules/item/entities";
import { Order } from "@/modules/order";
import { InMemoryOrderRepository } from "@/modules/order/repositories";

import { CreateOrderUseCase } from "../create-order-use-case";
describe("Create order", () => {
  let sut: CreateOrderUseCase;

  beforeEach(() => {
    const repository = new InMemoryOrderRepository();
    sut = new CreateOrderUseCase(repository);
  });
  it("Should be able to create order with valid props", async () => {
    const item = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: ItemTypes.pizza
    });

    const dto = {
      userId: randomUUID(),
      items: [item],
      shippingCost: 0
    };

    const order = await sut.execute(dto);

    expect(order).toBeDefined();
    expect(order).toBeInstanceOf(Order);
    expect(order.userId).toBe(dto.userId);
    expect(order.id).toBeTypeOf("string");
    expect(order.createdAt).toBeDefined();
    expect(order.createdAt).toBeInstanceOf(Date);
  });

  it("Should throw error if order is created without items", async () => {
    const dto = {
      userId: randomUUID(),
      items: [],
      shippingCost: 0
    };

    await expect(sut.execute(dto)).rejects.toThrowError();
  });
});
