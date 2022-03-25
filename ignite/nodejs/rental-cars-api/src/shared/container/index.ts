import { container } from "tsyringe";

import { ICategoryRepository } from "../../modules/cars/repositories/interfaces/category.repository.interfaces";
import { CategoryRepository } from "../../modules/cars/repositories/implementations/category.repository";

import { SpecificationRepository } from "../../modules/cars/repositories/implementations/specification.repository";
import { ISpecificationRepository } from "../../modules/cars/repositories/interfaces/specification.repository.interface";

container.registerSingleton<ICategoryRepository>(
  CategoryRepository.name,
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  SpecificationRepository.name,
  SpecificationRepository
);
