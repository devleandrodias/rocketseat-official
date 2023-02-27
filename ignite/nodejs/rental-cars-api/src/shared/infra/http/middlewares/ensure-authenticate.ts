import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { envs } from "@config/envs";
import { AppError } from "@shared/errors/app-error";

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
    const { sub: userId } = verify(token, envs.jwtToken) as IJwtPayload;

    req.user = { id: userId };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
