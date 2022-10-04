import { container } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/user.repository.interface";
import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";
import { ICategoryRepository } from "@modules/cars/repositories/interfaces/category.repository.interfaces";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/specification.repository.interface";

import { CarRepository } from "@modules/cars/infra/typeorm/repositories/car.repository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/user.repository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/category.repository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specification.repository";

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

container.registerSingleton<ICarRepository>(CarRepository.name, CarRepository);
