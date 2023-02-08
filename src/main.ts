import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConn";
import { errorHandler, logEvents, logger } from "./middlewares/middlewares";
import { root, userRoutes } from "./routes/routes";

function main() {
  dotenv.config();
  const app: Express = express();
  const port: number | string = process.env.APP_PORT || 3000;

  connectDB();

  app.use(logger);

  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use("/", express.static(path.join(__dirname, "..", "public")));
  app.use("/", root);

  app.use("/api/users", userRoutes);

  app.all("*", (req: Request, res: Response) => {
    res.status(404);
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "..", "public", "views", "404.html"));
    } else if (req.accepts("json")) {
      res.json({
        msg: "Page Not Found",
      });
    } else {
      res.type("txt").send("Page Not Found");
    }
  });

  app.use(errorHandler);

  mongoose.connection.once("open", () => {
    console.log("Connect to mongodb");
    app.listen(port, () => console.log(`run server on port : ${port}`));
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  });
}

main();
