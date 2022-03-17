import { Specification } from "../../models/specification";

export interface ICreateSpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  find(): Specification[];
  findById(id: string): Specification;
  findByName(name: string): Specification;
  create(data: ICreateSpecificationDto): void;
}
