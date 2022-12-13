import { container } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/user.repository.interface";
import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";
import { ICategoryRepository } from "@modules/cars/repositories/interfaces/category.repository.interfaces";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/SpecificationRepositoryInterface";

import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/user.repository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/category.repository";
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

container.registerSingleton<ICarRepository>(CarRepository.name, CarRepository);
