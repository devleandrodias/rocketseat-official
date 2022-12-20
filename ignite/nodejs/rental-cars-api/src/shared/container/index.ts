import { container } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/user.repository.interface";
import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";
import { ICarImageRepository } from "@modules/cars/repositories/interfaces/ICarImageRepository";
import { ICategoryRepository } from "@modules/cars/repositories/interfaces/category.repository.interfaces";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/SpecificationRepositoryInterface";

import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/user.repository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/CarImageRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/category.repository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";

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
