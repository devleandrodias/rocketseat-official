import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/app-error";
import { ISpecificationRepository } from "../../repositories/interfaces/specification.repository.interface";

interface ICreateSpecificationRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSepecificationService {
  constructor(
    @inject("SpecificationRepository")
    private repository: ISpecificationRepository
  ) {}

  async execute({
    name,
    description,
  }: ICreateSpecificationRequest): Promise<void> {
    if (await this.repository.findByName(name)) {
      throw new AppError("Specification already exists!");
    }

    await this.repository.create({ name, description });
  }
}
