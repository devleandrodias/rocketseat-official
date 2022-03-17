import { Specification } from "../../models/specification";
import { SpecificationRepository } from "../../repositories/implementations/specification.repository";

export class FindSpecificationsService {
  constructor(private repository: SpecificationRepository) {}
  execute = (): Specification[] => this.repository.find();
}
