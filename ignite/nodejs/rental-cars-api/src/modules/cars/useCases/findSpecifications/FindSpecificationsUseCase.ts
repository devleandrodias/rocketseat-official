import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/specification";
import { ISpecificationRepository } from "@modules/cars/repositories/interfaces/SpecificationRepositoryInterface";

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
