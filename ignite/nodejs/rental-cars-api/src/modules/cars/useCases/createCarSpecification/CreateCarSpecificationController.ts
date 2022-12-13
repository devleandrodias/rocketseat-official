import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarUseCase = container.resolve(CreateCarSpecificationUseCase);
    const carWithSpecifications = await createCarUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return res.json(carWithSpecifications);
  }
}
