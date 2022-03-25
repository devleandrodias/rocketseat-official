import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserService } from "./create-user.service";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driverLicense } = req.body;
    const service = container.resolve(CreateUserService);
    await service.execute({ name, email, password, driverLicense });
    return res.status(201).send();
  }
}
