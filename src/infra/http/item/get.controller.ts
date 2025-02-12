import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { GetItemUseCase } from "@/modules/item/use-cases";

import { HttpStatus } from "../types";

const schema = z.object({
  id: z.string()
});

export class GetItemController {
  constructor(private service: GetItemUseCase) {}
  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = schema.parse(req.params);

      const response = await this.service.execute(id);

      res.status(HttpStatus.OK).send(response).end();
    } catch (error) {
      next(error);
    }
  };
}
