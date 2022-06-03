import { inject, injectable } from "tsyringe";
import { Specification } from "../../infra/typeorm/entities/specification";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specification.repository";

@injectable()
export class FindSpecificationsService {
  constructor(
    @inject("SpecificationRepository")
    private repository: SpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.repository.find();
  }
}
