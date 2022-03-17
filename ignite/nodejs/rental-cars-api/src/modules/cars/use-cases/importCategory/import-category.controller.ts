import { Request, Response } from "express";
import { ImportCategoryService } from "./import-category.service";

export class ImportCategoryController {
  constructor(private service: ImportCategoryService) {}

  handle(req: Request, res: Response): Response {
    const { file } = req;
    this.service.execute(file);
    return res.status(204).send();
  }
}
