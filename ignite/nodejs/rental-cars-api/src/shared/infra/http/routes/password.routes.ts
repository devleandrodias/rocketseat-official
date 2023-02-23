import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const resetPasswordController = new ResetPasswordController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post("/reset", resetPasswordController.handle);
passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRoutes };
