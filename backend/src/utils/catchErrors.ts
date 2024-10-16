import { NextFunction, Request, Response } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Catches any errors thrown by the given controller and passes them to the next
 * middleware as an error. This is especially useful for handling async errors.
 *
 * @param controller - The controller function to be wrapped
 * @returns A controller function that will catch any errors thrown by the
 * original controller and pass them to the next middleware
 */
const catchErrors =
  (controller: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default catchErrors;
