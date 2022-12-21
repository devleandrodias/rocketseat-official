import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCategoriesUseCase } from "./FindCategoriesUseCase";

export class FindCategoriesController {
  async handle(_: Request, res: Response) {
    const service = container.resolve(FindCategoriesUseCase);
    return res.status(200).json(await service.execute());
  }
}
