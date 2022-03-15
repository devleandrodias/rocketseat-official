import { Category } from "../models/category";

interface ICreateCategoryDto {
  name: string;
  description: string;
}

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
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

export { CategoryRepository };
