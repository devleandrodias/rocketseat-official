import { Repository } from "typeorm";

import { Category } from "../../entities/category";
import { AppDataSource } from "../../../../database/data-source";

import {
  ICreateCategoryDto,
  ICategoryRepository,
} from "../interfaces/category.repository.interfaces";

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
