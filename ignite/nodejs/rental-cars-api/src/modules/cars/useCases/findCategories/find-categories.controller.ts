import { Request, Response } from "express";
import { FindCategoriesService } from "./find-categories.service";

export class FindCategoriesController {
  constructor(private service: FindCategoriesService) {}

  handle(_: Request, res: Response): Response {
    return res.status(200).json(this.service.execute());
  }
}
