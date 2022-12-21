import { Repository } from "typeorm";

import { ICreateCategoryDto } from "@modules/cars/dtos/ICreateCategoryDto";
import { ICategoryRepository } from "@modules/cars/repositories/ICreateCategory";

import { Category } from "../entities/Category";
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source";

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async find(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ where: { name } });
  }

  async create({ name, description }: ICreateCategoryDto): Promise<void> {
    const category = this.repository.create({ name, description });
    await this.repository.save(category);
  }
}
