import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { formatZodErrorMessage } from "@/core/zod";

import { HttpStatus } from "../types";
export class ErrorHandlerMiddleware {
  private parse = (error: Error) => {
    const statusMap: Record<string, HttpStatus> = {
      BadRequestException: HttpStatus.BAD_REQUEST,
      NotFoundException: HttpStatus.NOT_FOUND,
      UnauthorizedException: HttpStatus.UNAUTHORIZED,
      ForbiddenException: HttpStatus.FORBIDDEN,
      ConflictException: HttpStatus.CONFLICT,
      InternalServerException: HttpStatus.INTERNAL_SERVER_ERROR
    };

    const defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const status = statusMap[error?.name] || defaultStatus;

    return {
      status,
      message: error.message
    };
  };
  handle = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (response.headersSent) {
      next(error);

      return;
    }

    let statusCode: number;
    let message: string;

    const isZodError = (error: Error) => {
      return error instanceof ZodError;
    };

    if (isZodError(error)) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = formatZodErrorMessage(error as ZodError);
    } else {
      const parsedError = this.parse(error);
      statusCode = parsedError.status;
      message = parsedError.message;
    }

    response.status(statusCode).json({ message });
  };
}
