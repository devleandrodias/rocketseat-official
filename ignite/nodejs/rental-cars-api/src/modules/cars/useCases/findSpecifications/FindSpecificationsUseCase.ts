import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
export class FindSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private repository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.repository.find();
  }
}
