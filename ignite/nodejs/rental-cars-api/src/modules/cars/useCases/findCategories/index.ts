import { FindCategoriesService } from "./find-categories.service";
import { FindCategoriesController } from "./find-categories.controller";
import { CategoryRepository } from "../../repositories/implementations/category.repository";

const categoryRepository = CategoryRepository.getInstance();
const findCategoriesService = new FindCategoriesService(categoryRepository);
const findCategoriesController = new FindCategoriesController(
  findCategoriesService
);

export { findCategoriesController };
