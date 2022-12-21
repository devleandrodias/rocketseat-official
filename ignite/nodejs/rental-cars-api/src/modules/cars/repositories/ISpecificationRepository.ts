import { Specification } from "../infra/typeorm/entities/Specification";
import { ICreateSpecificationDto } from "../dtos/ICreateSpecificationDto";

export interface ISpecificationRepository {
  find(): Promise<Specification[]>;
  findById(id: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  create(data: ICreateSpecificationDto): Promise<Specification>;
}
