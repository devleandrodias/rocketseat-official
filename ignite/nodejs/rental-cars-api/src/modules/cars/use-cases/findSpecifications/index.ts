import { FindSpecificationsService } from "./find-specifications.service";
import { FindSpecificationsController } from "./find-specifications.controller";
import { SpecificationRepository } from "../../repositories/implementations/specification.repository";

const specificationRepository = SpecificationRepository.getInstance();

const findSpecificationsService = new FindSpecificationsService(
  specificationRepository
);

export const findSpecificationsController = new FindSpecificationsController(
  findSpecificationsService
);
