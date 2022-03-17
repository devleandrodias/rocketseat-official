import { Request, Response } from "express";
import { CreateSepecificationService } from "./create-specification.service";

export class CreateSpecificationController {
  constructor(private service: CreateSepecificationService) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    this.service.execute({ name, description });
    return res.status(201).send();
  }
}
