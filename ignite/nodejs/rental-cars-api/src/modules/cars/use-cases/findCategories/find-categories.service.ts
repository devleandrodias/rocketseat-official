import { Category } from "../../models/category";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

export class FindCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}
  execute = (): Category[] => this.categoryRepository.find();
}
