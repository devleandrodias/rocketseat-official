import { container } from "tsyringe";
import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ImportCategoryUseCase);
    await service.execute(req.file);
    return res.status(204).send();
  }
}
