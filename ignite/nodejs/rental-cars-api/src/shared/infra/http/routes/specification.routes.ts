import { Router } from "express";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensure-authenticate";
import { FindSpecificationsController } from "@modules/cars/useCases/findSpecifications/find-specifications.controller";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/create-specification.controller";

const specificationRoutes = Router();

const findSpecificationsController = new FindSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.get(
  "/",
  ensureAuthenticate,
  findSpecificationsController.handle
);

specificationRoutes.post(
  "/",
  ensureAuthenticate,
  createSpecificationController.handle
);

export { specificationRoutes };
