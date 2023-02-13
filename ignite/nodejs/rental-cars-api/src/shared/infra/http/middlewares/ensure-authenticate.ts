import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { envs } from "@config/envs";
import { AppError } from "@shared/errors/app-error";
import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";

interface IJwtPayload {
  sub: string;
}

export async function ensureAuthenticate(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  const userTokenRepository = new UserTokenRepository();

  if (!authHeader) throw new AppError("Token not found", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, envs.jwtRefreshToken) as IJwtPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );

    if (!user) throw new AppError("User does not exists!", 401);

    req.user = { id: user.id };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
