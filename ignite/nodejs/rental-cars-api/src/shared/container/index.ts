import { container } from "tsyringe";

import { CategoryRepository } from "../../modules/cars/repositories/implementations/category.repository";
import { ICategoryRepository } from "../../modules/cars/repositories/interfaces/category.repository.interfaces";

import { SpecificationRepository } from "../../modules/cars/repositories/implementations/specification.repository";
import { ISpecificationRepository } from "../../modules/cars/repositories/interfaces/specification.repository.interface";

import { UserRepository } from "../../modules/accounts/repositories/implementations/user.repository";
import { IUserRepository } from "../../modules/accounts/repositories/user.repository.interface";

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
