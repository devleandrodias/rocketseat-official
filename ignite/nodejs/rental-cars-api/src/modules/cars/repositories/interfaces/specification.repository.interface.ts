import { Specification } from "../../infra/typeorm/entities/specification";

export interface ICreateSpecificationDto {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  find(): Promise<Specification[]>;
  findById(id: string): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  create(data: ICreateSpecificationDto): Promise<void>;
}
