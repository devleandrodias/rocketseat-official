import { CreateCategoryService } from "./create-category.service";
import { CreateCategoryController } from "./create-category.controller";
import { CategoryRepository } from "../../repositories/implementations/category.repository";

export default (): CreateCategoryController => {
  const repository = new CategoryRepository();
  const service = new CreateCategoryService(repository);
  return new CreateCategoryController(service);
};
