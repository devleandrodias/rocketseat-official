import { Router } from "express";
import { findSpecificationsController } from "../modules/cars/useCases/findSpecifications";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.get("/", (req, res) => {
  return findSpecificationsController.handle(req, res);
});

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

export { specificationRoutes };
