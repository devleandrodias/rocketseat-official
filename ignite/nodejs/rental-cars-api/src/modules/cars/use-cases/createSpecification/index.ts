import { CreateSepecificationService } from "./create-specification.service";
import { CreateSpecificationController } from "./create-specification.controller";
import { SpecificationRepository } from "../../repositories/implementations/specification.repository";

const specificationRepository = SpecificationRepository.getInstance();

const createSepecificationService = new CreateSepecificationService(
  specificationRepository
);

export const createSpecificationController = new CreateSpecificationController(
  createSepecificationService
);
