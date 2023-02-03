import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalByUserController } from "@modules/rentals/useCases/listRentalByUser/ListRentalByUserController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticate } from "../middlewares/ensure-authenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const listRentalByUserController = new ListRentalByUserController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes
  .use(ensureAuthenticate)
  .get("/user", listRentalByUserController.handle)
  .post("/", createRentalController.handle)
  .post("/devolution/:id ", devolutionRentalController.handle);

export { rentalRoutes };
