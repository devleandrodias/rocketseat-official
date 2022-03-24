import { Specification } from "../../entities/specification";

import {
  ICreateSpecificationDto,
  ISpecificationRepository,
} from "../interfaces/specification.repository.interface";

export class SpecificationRepository implements ISpecificationRepository {
  private static INSTANCE: SpecificationRepository;

  private constructor(private specifications: Specification[] = []) {}

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }

    return SpecificationRepository.INSTANCE;
  }

  find(): Specification[] {
    return this.specifications;
  }

  findById(id: string): Specification {
    return this.specifications.find((x) => x.id === id);
  }

  findByName(name: string): Specification {
    return this.specifications.find((x) => x.name === name);
  }

  create({ name, description }: ICreateSpecificationDto): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, createdAt: new Date() });

    this.specifications.push(specification);
  }
}
