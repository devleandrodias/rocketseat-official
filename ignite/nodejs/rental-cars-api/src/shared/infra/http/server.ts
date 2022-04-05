import "reflect-metadata";
import "express-async-errors";
import "../../container";

import express, { Request, Response, NextFunction } from "express";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json";

import { AppError } from "@shared/errors/app-error";
import { router } from "@shared/infra/http/routes";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

AppDataSource.initialize().then(() => {
  console.log("Database is running 🚀...");

  const app = express();

  app.use(express.json());
  app.use(router);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "Error",
      message: `Internal server error - ${err.message}`,
    });
  });

  app.listen(4000, () => {
    console.log("Server is running 🚀...");
  });
});
