import { randomInt, randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { Item } from "@/modules/item/entities";
import { InMemoryItemRepository, ItemRepository } from "@/modules/item/repositories";
import { InMemoryOrderRepository, OrderRepository } from "@/modules/order/repositories";

import { AddItemToOrderUseCase } from "../add-item-to-order-use-case";
import { CreateOrderUseCase } from "../create-order-use-case";
import { GetOrderUseCase } from "../get-order-use-case";
describe("Add item to order", () => {
  let sut: AddItemToOrderUseCase;
  let orderRepository: OrderRepository;
  let itemRepository: ItemRepository;

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();
    itemRepository = new InMemoryItemRepository();
    sut = new AddItemToOrderUseCase(itemRepository, orderRepository);
  });
  it("Should be able to add item to existing order", async () => {
    const item1 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    itemRepository.create(item1);

    const dto = {
      userId: randomUUID(),
      items: [item1]
    };

    const createOrderUseCase = new CreateOrderUseCase(orderRepository);

    const order = await createOrderUseCase.execute(dto);

    expect(order.items.length).toBe(1);
    expect(order.value).toBe(item1.value);

    const item2 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    itemRepository.create(item2);
    await sut.execute({ itemId: item2.id, orderId: order.id });

    expect(order.items.length).toBe(2);
    expect(order.value).toBe(item1.value + item2.value);

    const item3 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    itemRepository.create(item3);
    await sut.execute({ itemId: item3.id, orderId: order.id });

    expect(order.items.length).toBe(3);
    expect(order.value).toBe(item1.value + item2.value + item3.value);
  });
  it("Should change updatedAt prop after adding item to order", async () => {
    const item1 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    itemRepository.create(item1);

    const dto = {
      userId: randomUUID(),
      items: [item1]
    };

    const createOrderUseCase = new CreateOrderUseCase(orderRepository);
    const order = await createOrderUseCase.execute(dto);

    expect(order.items.length).toBe(1);
    expect(order.value).toBe(item1.value);
    expect(order.updatedAt).toBeFalsy();

    const item2 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000),
      type: "Pizza"
    });

    itemRepository.create(item2);
    await sut.execute({ itemId: item2.id, orderId: order.id });

    const getOrderUseCase = new GetOrderUseCase(orderRepository);
    const foundOrder = await getOrderUseCase.execute({ orderId: order.id, isAdmin: true });

    expect(order.items.length).toBe(2);
    expect(order.value).toBe(item1.value + item2.value);
    expect(foundOrder.updatedAt).toBeInstanceOf(Date);
  });
});
