import { container } from "tsyringe";
import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const result = await authenticateUserUseCase.execute({ email, password });
    return res.status(200).json(result);
  }
}
