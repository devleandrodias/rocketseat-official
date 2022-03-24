import { Request, Response } from "express";
import { FindCategoriesService } from "./find-categories.service";

export class FindCategoriesController {
  constructor(private service: FindCategoriesService) {}

  async handle(_: Request, res: Response) {
    return res.status(200).json(await this.service.execute());
  }
}
