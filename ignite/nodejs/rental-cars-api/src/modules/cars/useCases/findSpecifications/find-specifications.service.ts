import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/specification";
import { SpecificationRepository } from "../../repositories/implementations/specification.repository";

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
