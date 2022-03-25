import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/authenticate-user.controller";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sign-in", authenticateUserController.handle);

export { authenticateRoutes };
