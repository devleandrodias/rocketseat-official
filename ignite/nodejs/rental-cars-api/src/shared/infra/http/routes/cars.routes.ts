import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/create-car.controller";

import { ensureAdmin } from "../middlewares/ensure-admin";
import { ensureAuthenticate } from "../middlewares/ensure-authenticate";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
