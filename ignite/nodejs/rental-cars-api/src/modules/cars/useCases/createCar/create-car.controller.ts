import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateCarService } from "./create-car.service";

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarService);

    const car = await createCarUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    });

    return response.status(201).json(car);
  }
}
