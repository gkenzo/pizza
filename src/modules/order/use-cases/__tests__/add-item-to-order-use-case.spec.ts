import { randomInt, randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { Item } from "@/modules/item/entities";
import { Order } from "@/modules/order";
import { inMemoryOrderRepository, OrderRepository } from "@/modules/order/repositories";

import { CreateOrderUseCase } from "../create-order-use-case";
describe("Add item to order", () => {
  let sut: AddItemToOrderUseCase;
  let repository: OrderRepository;

  beforeEach(() => {
    repository = new inMemoryOrderRepository();
    sut = new AddItemToOrderUseCase(repository);
  });
  it("Should be able to add item to existing order", async () => {
    const item1 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    const dto = {
      userId: randomUUID(),
      items: [item1]
    };

    const createOrderUseCase = new CreateOrderUseCase(repository);

    const order = await createOrderUseCase.execute(dto);

    const item2 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    order.addItem(item2);

    expect(order).toBeDefined();
    expect(order).toBeInstanceOf(Order);
    expect(order.userId).toBe(dto.userId);
    expect(order.id).toBeTypeOf("string");
    expect(order.createdAt).toBeDefined();
    expect(order.createdAt).toBeInstanceOf(Date);
  });
});
