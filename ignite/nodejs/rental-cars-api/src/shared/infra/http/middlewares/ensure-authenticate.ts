import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { AppError } from "@shared/errors/app-error";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

interface IJwtPayload {
  sub: string;
}

export async function ensureAuthenticate(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token not found", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "8a2b50286d2051d88021c5b0e971e56a9c5e75f3"
    ) as IJwtPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(userId);

    if (!user) throw new AppError("User does not exists!", 401);

    req.user = { id: user.id };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
