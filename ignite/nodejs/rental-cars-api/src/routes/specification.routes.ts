import { Router } from "express";
import { findSpecificationsController } from "../modules/cars/use-cases/findSpecifications";
import { createSpecificationController } from "../modules/cars/use-cases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.get("/", (req, res) => {
  return findSpecificationsController.handle(req, res);
});

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

export { specificationRoutes };
