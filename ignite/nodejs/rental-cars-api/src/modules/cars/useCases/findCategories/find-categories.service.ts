import { Category } from "../../entities/category";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

export class FindCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
