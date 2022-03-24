import { Request, Response } from "express";
import { ImportCategoryService } from "./import-category.service";

export class ImportCategoryController {
  constructor(private service: ImportCategoryService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    await this.service.execute(file);
    return res.status(204).send();
  }
}
