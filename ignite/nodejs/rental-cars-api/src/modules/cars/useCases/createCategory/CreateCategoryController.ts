import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const service = container.resolve(CreateCategoryUseCase);
    await service.execute({ name, description });
    return res.status(201).send();
  }
}
