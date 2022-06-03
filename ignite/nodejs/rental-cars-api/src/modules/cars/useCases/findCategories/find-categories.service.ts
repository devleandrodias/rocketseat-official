import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/category";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

@injectable()
export class FindCategoriesService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
