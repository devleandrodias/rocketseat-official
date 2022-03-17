import { ISpecificationRepository } from "../../repositories/interfaces/specification.repository.interface";

interface ICreateSpecificationRequest {
  name: string;
  description: string;
}

export class CreateSepecificationService {
  constructor(private repository: ISpecificationRepository) {}

  execute({ name, description }: ICreateSpecificationRequest): void {
    if (this.repository.findByName(name)) {
      throw new Error("Specification already exists!");
    }

    this.repository.create({ name, description });
  }
}
