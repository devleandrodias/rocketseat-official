import { ImportCategoryService } from "./import-category.service";
import { ImportCategoryController } from "./import-category.controller";
import { CategoryRepository } from "../../repositories/implementations/category.repository";

const categoryRepository = CategoryRepository.getInstance();

const importCategoryService = new ImportCategoryService(categoryRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryService
);
