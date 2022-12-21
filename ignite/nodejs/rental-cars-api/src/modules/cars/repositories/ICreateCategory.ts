import { ICreateCategoryDto } from "../dtos/ICreateCategoryDto";
import { Category } from "../infra/typeorm/entities/Category";

export interface ICategoryRepository {
  find(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create(data: ICreateCategoryDto): Promise<void>;
}
