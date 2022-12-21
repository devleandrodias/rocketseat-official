import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/app-error";
import { ISpecificationRepository } from "../../repositories/interfaces/SpecificationRepositoryInterface";

interface ICreateSpecificationRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
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
