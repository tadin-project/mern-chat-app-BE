import { NextFunction, Request, Response } from "express";
import ErrorHandler from "src/interfaces/middlewares/errorHandlerInterface";
import { logEvents } from "./logger";

const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    `errLog.log`
  );

  console.log(err.stack);

  const status: string | number = res.statusCode ? res.statusCode : 500;

  res.status(status);
  res.json({ message: err.message });
};

export { errorHandler };
