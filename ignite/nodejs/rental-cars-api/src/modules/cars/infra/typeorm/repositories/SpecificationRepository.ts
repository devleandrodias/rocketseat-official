import { In, Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { ICreateSpecificationDto } from "@modules/cars/dtos/ICreateSpecificationDto";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async find(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Specification> {
    return this.repository.findOne({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({ id: In(ids) });
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ where: { name } });
  }

  async create(
    createSpecificationDto: ICreateSpecificationDto
  ): Promise<Specification> {
    const { name, description } = createSpecificationDto;
    const specification = this.repository.create({ name, description });
    await this.repository.save(specification);
    return specification;
  }
}
