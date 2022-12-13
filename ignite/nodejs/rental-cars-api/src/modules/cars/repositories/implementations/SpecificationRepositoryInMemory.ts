import { Specification } from "@modules/cars/infra/typeorm/entities/specification";

import {
  ICreateSpecificationDto,
  ISpecificationRepository,
} from "../interfaces/SpecificationRepositoryInterface";

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  private specifications: Specification[] = [];

  async find(): Promise<Specification[]> {
    return this.specifications;
  }

  async findById(id: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.id === id);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async create(data: ICreateSpecificationDto): Promise<Specification> {
    const { description, name } = data;

    const specification: Specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
}
