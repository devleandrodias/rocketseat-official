import multer from "multer";
import { Router } from "express";

import uploadConfig from "@config/upload";

import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensure-authenticate";
import { CreateUserController } from "@modules/accounts/useCases/createUser/create-user.controller";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/update-user-avatar.controller";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./temp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
