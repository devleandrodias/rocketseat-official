import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
export class FindCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private repository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.repository.find();
  }
}
