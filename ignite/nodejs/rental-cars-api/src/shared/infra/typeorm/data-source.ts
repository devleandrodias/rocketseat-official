import "reflect-metadata";

import { DataSource } from "typeorm";

import { envs } from "@config/envs";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

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
