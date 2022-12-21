import { envs } from "@config/envs";
import { app } from "./app";
import { AppDataSource } from "../typeorm/data-source";

AppDataSource.initialize().then(() => {
  console.info("Database is running 🚀...");

  app.listen(envs.port, () => {
    console.info("Server is running 🚀...");
  });
});
