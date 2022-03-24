import { FindCategoriesService } from "./find-categories.service";
import { FindCategoriesController } from "./find-categories.controller";
import { CategoryRepository } from "../../repositories/implementations/category.repository";

export default () => {
  const repository = new CategoryRepository();
  const service = new FindCategoriesService(repository);
  return new FindCategoriesController(service);
};
