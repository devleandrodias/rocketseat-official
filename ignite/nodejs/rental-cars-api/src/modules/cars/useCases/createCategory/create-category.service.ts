import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../erros/app-error";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryService {
  private _categoriesRepository: ICategoryRepository;

  constructor(
    @inject("CategoryRepository")
    categoriesRepository: ICategoryRepository
  ) {
    this._categoriesRepository = categoriesRepository;
  }

  async execute({ name, description }: ICreateCategoryRequest): Promise<void> {
    if (await this._categoriesRepository.findByName(name)) {
      throw new AppError("Category already exists!");
    }

    await this._categoriesRepository.create({ name, description });
  }
}
