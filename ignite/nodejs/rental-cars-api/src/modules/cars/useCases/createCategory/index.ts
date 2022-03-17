import { CreateCategoryService } from "./create-category.service";
import { CreateCategoryController } from "./create-category.controller";
import { CategoryRepository } from "../../repositories/implementations/category.repository";

const categoryRepository = CategoryRepository.getInstance();

const createCategoryService = new CreateCategoryService(categoryRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export { createCategoryController };
