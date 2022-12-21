import { ICreateCategoryDto } from "@modules/cars/dtos/ICreateCategoryDto";
import { ICategoryRepository } from "@modules/cars/repositories/ICreateCategory";

import { Category } from "../typeorm/entities/Category";

export class CreateCategoryRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];

  async find(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((x) => x.name === name);
  }

  async create(data: ICreateCategoryDto): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name: data.name,
      description: data.description,
    });

    this.categories.push(category);
  }
}
