import { Category } from "../../infra/typeorm/entities/category";

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

export interface ICategoryRepository {
  find(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create(data: ICreateCategoryDto): Promise<void>;
}
