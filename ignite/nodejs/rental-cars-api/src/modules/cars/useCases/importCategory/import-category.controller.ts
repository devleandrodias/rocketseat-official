import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryService } from "./import-category.service";

export class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ImportCategoryService);
    await service.execute(req.file);
    return res.status(204).send();
  }
}
