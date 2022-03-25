import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/create-specification.controller";
import { FindSpecificationsController } from "../modules/cars/useCases/findSpecifications/find-specifications.controller";

const specificationRoutes = Router();

const findSpecificationsController = new FindSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.get("/", findSpecificationsController.handle);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
