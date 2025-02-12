import { NextFunction, Request, Response } from "express";

import { ListItemUseCase } from "@/modules/item/use-cases";

import { HttpStatus } from "../types";

export class ListItemController {
  constructor(private service: ListItemUseCase) {}
  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.service.execute();

      res.status(HttpStatus.OK).send(response).end();
    } catch (error) {
      next(error);
    }
  };
}
