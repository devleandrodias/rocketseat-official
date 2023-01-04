import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/app-error";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private repository: ICategoryRepository
  ) {}

  async execute({ name, description }: ICreateCategoryRequest): Promise<void> {
    if (await this.repository.findByName(name)) {
      throw new AppError("Category already exists!");
    }

    await this.repository.create({ name, description });
  }
}
