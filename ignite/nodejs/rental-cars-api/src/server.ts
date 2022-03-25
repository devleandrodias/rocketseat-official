import "reflect-metadata";
import "./shared/container";

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import { router } from "./routes";
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize().then(() => {
  console.log("Database is running 🚀...");

  const app = express();

  app.use(express.json());
  app.use(router);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(4000, () => {
    console.log("Server is running 🚀...");
  });
});
