import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidV4 } from "uuid";

const fsPromises = fs.promises;

const logEvents = async (
  message: string,
  logFileName: string
): Promise<void> => {
  const dateTime: string = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem: string = `${dateTime}\t${uuidV4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = (req: Request, res: Response, next: NextFunction): void => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, `reqLog.log`);
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
