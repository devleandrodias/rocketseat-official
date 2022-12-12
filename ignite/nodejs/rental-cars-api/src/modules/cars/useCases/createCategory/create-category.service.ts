import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/app-error";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryService {
  constructor(
    @inject("CategoryRepository")
    private reopsitory: ICategoryRepository
  ) {}

  async execute({ name, description }: ICreateCategoryRequest): Promise<void> {
    if (await this.reopsitory.findByName(name)) {
      throw new AppError("Category already exists!");
    }

    await this.reopsitory.create({ name, description });
  }
}
