import { Request, Response } from "express";

import { HttpStatus } from "../../types";

class HealthCheckController {
  handle = async (req: Request, res: Response) => {
    try {
      return res.status(HttpStatus.OK).json({ status: "OK" });
    } catch (error) {
      console.log(error);
    }
  };
}

export { HealthCheckController };
