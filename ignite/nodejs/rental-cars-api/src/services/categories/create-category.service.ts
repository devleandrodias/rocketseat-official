import { ICategoryRepository } from "../../repositories/categories.repository";

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private _categoriesRepository: ICategoryRepository;

  constructor(categoriesRepository: ICategoryRepository) {
    this._categoriesRepository = categoriesRepository;
  }

  execute({ name, description }: ICreateCategoryRequest): void {
    if (this._categoriesRepository.findByName(name)) {
      throw new Error("Category already exists!");
    }

    this._categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
