import { Request, Response } from "express";
import { CreateCategoryService } from "./create-category.service";

class CreateCategoryController {
  constructor(private createCategotyService: CreateCategoryService) {}

  handle(req: Request, res: Response) {
    const { name, description } = req.body;
    this.createCategotyService.execute({ name, description });
    return res.status(201).send();
  }
}

export { CreateCategoryController };
