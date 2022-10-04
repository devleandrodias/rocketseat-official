import "reflect-metadata";

import { DataSource } from "typeorm";

import { envs } from "@config/envs";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { User } from "@modules/accounts/infra/typeorm/entities/user";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.databaseHost,
  port: envs.databasePort,
  username: envs.databaseUsername,
  password: envs.databasePassword,
  database: envs.databaseDatabase,
  synchronize: true,
  logging: true,
  entities: [Specification, Category, User, Car],
  migrations: [],
  subscribers: [],
});
