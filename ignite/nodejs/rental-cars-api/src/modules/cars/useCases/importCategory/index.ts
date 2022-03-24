import { ImportCategoryService } from "./import-category.service";
import { ImportCategoryController } from "./import-category.controller";
import { CategoryRepository } from "../../repositories/implementations/category.repository";

export default () => {
  const category = new CategoryRepository();
  const service = new ImportCategoryService(category);
  return new ImportCategoryController(service);
};
