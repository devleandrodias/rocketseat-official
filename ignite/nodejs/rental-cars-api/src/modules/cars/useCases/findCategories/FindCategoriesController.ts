import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCategoriesUseCase } from "./FindCategoriesUseCase";

export class FindCategoriesController {
  async handle(_: Request, res: Response) {
    const findCategoriesUseCase = container.resolve(FindCategoriesUseCase);
    return res.status(200).json(await findCategoriesUseCase.execute());
  }
}
