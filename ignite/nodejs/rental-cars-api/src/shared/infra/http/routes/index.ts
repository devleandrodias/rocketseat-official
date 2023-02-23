import { Router } from "express";

import { userRoutes } from "./user.routes";
import { carsRouter } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";
import { categoriesRoutes } from "./categories.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { specificationRoutes } from "./specification.routes";

const router = Router();

router.use("/cars", carsRouter);
router.use("/users", userRoutes);
router.use("/rentals", rentalRoutes);
router.use("/auth", authenticateRoutes);
router.use("/password", passwordRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);

router.use(authenticateRoutes);

export { router };
