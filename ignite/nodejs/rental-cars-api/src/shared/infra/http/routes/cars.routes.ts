import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/create-car.controller";
import { FindAvailableCarsController } from "@modules/cars/useCases/findAvailableCars/FindAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

import { ensureAdmin } from "../middlewares/ensure-admin";
import { ensureAuthenticate } from "../middlewares/ensure-authenticate";

const carsRouter = Router();

const createCarController = new CreateCarController();
const findAvailableCarsController = new FindAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRouter.get("/available", findAvailableCarsController.handle);

carsRouter.post(
  "/specifications/:id",
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRouter.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
