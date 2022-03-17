import { Category } from "../../models/category";

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface ICategoryRepository {
  findByName(name: string): Category;
  find(): Category[];
  create(data: ICreateCategoryDto): void;
}
