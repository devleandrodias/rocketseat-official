import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindCategoriesService } from "./find-categories.service";

export class FindCategoriesController {
  async handle(_: Request, res: Response) {
    const service = container.resolve(FindCategoriesService);
    return res.status(200).json(await service.execute());
  }
}
