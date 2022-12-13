import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/app-error";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { User } from "@modules/accounts/infra/typeorm/entities/user";

export async function ensureAdmin(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: id },
  });

  if (!user.is_admin) {
    throw new AppError("User is not admin!");
  }

  next();
}
