import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/httpStatus";
import { z } from "zod";
import AppError from "../utils/AppError";

const handleZorError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => {
    return {
      path: issue.path.join("."),
      message: issue.message,
    };
  });

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    appErrorCode: error.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}\nError:`, error);

  if (error instanceof z.ZodError) {
    handleZorError(res, error);
    return;
  }

  if (error instanceof AppError) {
    handleAppError(res, error);
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
  return;
};

export default errorHandler;
