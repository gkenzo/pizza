import { randomInt, randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { Item } from "@/modules/item/entities";

import { inMemoryOrderRepository, OrderRepository } from "../../repositories";
import { CreateOrderInputDTO, CreateOrderUseCase } from "../create-order-use-case";
import { GetOrderUseCase } from "../get-order-use-case";

describe("Get Order", () => {
  let sut: GetOrderUseCase;
  let repository: OrderRepository;
  beforeEach(() => {
    repository = new inMemoryOrderRepository();
    sut = new GetOrderUseCase(repository);
  });

  it("Should be able to get an order that belongs to the user", async () => {
    const item = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000)
    });

    const dto = {
      userId: randomUUID(),
      items: [item]
    };

    const createOrderUseCase = new CreateOrderUseCase(repository);
    const createdOrder = await createOrderUseCase.execute(dto);
    const order = await sut.execute({ orderId: createdOrder.id, userId: dto.userId });

    expect(order.id).toBeTypeOf("string");
    expect(order.createdAt).toBeInstanceOf(Date);
  });
  it("Should NOT be able to get an order that does not belongs to the user", async () => {
    const item = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000)
    });

    const dto = {
      userId: randomUUID(),
      items: [item]
    };

    const createOrderUseCase = new CreateOrderUseCase(repository);
    const createdOrder = await createOrderUseCase.execute(dto);
    await expect(sut.execute({ orderId: createdOrder.id, userId: randomUUID() })).rejects.toThrowError();
  });

  it("Should calculate value of order", async () => {
    const item1 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000)
    });
    const item2 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000)
    });

    const orderDto = {
      userId: randomUUID(),
      items: [item1, item2]
    };

    const createOrderUseCase = new CreateOrderUseCase(repository);
    const createdOrder = await createOrderUseCase.execute(orderDto);
    const order = await sut.execute({ orderId: createdOrder.id, userId: orderDto.userId });

    expect(order.value).toBe(item1.value + item2.value);
  });
  it("Should calculate total value of order", async () => {
    const item1 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000)
    });
    const item2 = Item.create({
      id: randomUUID(),
      description: faker.commerce.productDescription(),
      name: faker.commerce.productName(),
      value: randomInt(1000)
    });

    const orderDto: CreateOrderInputDTO = {
      userId: randomUUID(),
      items: [item1, item2],
      shippingCost: randomInt(1000)
    };

    const createOrderUseCase = new CreateOrderUseCase(repository);
    const createdOrder = await createOrderUseCase.execute(orderDto);
    const order = await sut.execute({ orderId: createdOrder.id, userId: orderDto.userId });

    expect(order.shippingCost).toBe(orderDto.shippingCost);
    expect(order.totalValue).toBe(item1.value + item2.value + orderDto.shippingCost);
    expect(order.totalValue).toBeDefined();
    expect(order.totalValue).toBeGreaterThan(0);
    expect(order.totalValue).to.not.be.toBeFalsy();
  });
});
