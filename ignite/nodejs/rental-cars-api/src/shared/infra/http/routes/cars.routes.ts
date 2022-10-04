import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/create-car.controller";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/", createCarController.handle);

export { carsRouter };
