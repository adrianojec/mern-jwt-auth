import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/httpStatus";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}\nError:`, error);
  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
