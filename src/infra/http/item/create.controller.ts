import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { ItemTypes } from "@/core";
import { CreateItemUseCase } from "@/modules/item/use-cases/create-item.use-case";

import { HttpStatus } from "../types";

const schema = z.object({
  description: z.string().min(5, "Description is too short").max(255, "Description is too long"),
  name: z.string().min(5, "Name is too short").max(255, "Name is too long"),
  value: z.number(),
  type: z.nativeEnum(ItemTypes)
});

export class CreateItemController {
  constructor(private service: CreateItemUseCase) {}
  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = schema.parse(req.body);

      const response = await this.service.execute(input);

      res.status(HttpStatus.CREATED).send(response).end();
    } catch (error) {
      next(error);
    }
  };
}
