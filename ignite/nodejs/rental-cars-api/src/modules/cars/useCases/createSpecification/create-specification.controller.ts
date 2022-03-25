import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateSepecificationService } from "./create-specification.service";

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const service = container.resolve(CreateSepecificationService);
    await service.execute({ name, description });
    return res.status(201).send();
  }
}
