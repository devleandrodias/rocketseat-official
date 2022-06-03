import { Repository } from "typeorm";

import {
  ICreateSpecificationDto,
  ISpecificationRepository,
} from "@modules/cars/repositories/interfaces/specification.repository.interface";

import { AppDataSource } from "@shared/infra/typeorm/data-source";

import { Specification } from "../entities/specification";

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

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ where: { name } });
  }

  async create({ name, description }: ICreateSpecificationDto): Promise<void> {
    const specification = this.repository.create({ name, description });
    await this.repository.save(specification);
  }
}
