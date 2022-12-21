import { container } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICreateRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICreateCategory";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/CarImageRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

container.registerSingleton<ICategoryRepository>(
  CategoryRepository.name,
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  SpecificationRepository.name,
  SpecificationRepository
);

container.registerSingleton<IUserRepository>(
  UserRepository.name,
  UserRepository
);

container.registerSingleton<ISpecificationRepository>(
  SpecificationRepository.name,
  SpecificationRepository
);

container.registerSingleton<ICarImageRepository>(
  CarImageRepository.name,
  CarImageRepository
);

container.registerSingleton<IRentalRepository>(
  RentalRepository.name,
  RentalRepository
);

container.registerSingleton<ICarRepository>(CarRepository.name, CarRepository);
