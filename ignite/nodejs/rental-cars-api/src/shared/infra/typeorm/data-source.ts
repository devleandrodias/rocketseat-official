import "reflect-metadata";

import { DataSource } from "typeorm";

import { envs } from "@config/envs";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { User } from "@modules/accounts/infra/typeorm/entities/user";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
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
  entities: [Specification, Category, User, Car, CarImage, Rental],
  migrations: [],
  subscribers: [],
});
