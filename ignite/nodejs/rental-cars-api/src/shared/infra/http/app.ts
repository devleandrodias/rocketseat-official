import "reflect-metadata";
import "express-async-errors";

import "../../container";
import "../../container/providers";

import express, { Request, Response } from "express";

import { router } from "@shared/infra/http/routes";
import { AppError } from "@shared/errors/app-error";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, _: Request, res: Response) => {
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

export { app };
