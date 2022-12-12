import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindAvailableCarsUseCase } from "./FindAvailableCarsUseCase";

export class FindAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const findAvailableCarsUseCase = container.resolve(
      FindAvailableCarsUseCase
    );

    const cars = await findAvailableCarsUseCase.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return res.status(200).json(cars);
  }
}
