import { Category } from "../../models/category";

import {
  ICategoryRepository,
  ICreateCategoryDto,
} from "../interfaces/category.repository.interfaces";

export class CategoryRepository implements ICategoryRepository {
  private categories: Category[];
  private static INSTANCE: CategoryRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository();
    }

    return CategoryRepository.INSTANCE;
  }

  find(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find((x) => x.name === name);
  }

  create({ name, description }: ICreateCategoryDto): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    });

    this.categories.push(category);
  }
}
