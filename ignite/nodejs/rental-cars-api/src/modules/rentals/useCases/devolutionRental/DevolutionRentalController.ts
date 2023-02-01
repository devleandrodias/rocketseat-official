import { container } from "tsyringe";
import { Request, Response } from "express";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.user.id;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    res.status(200).json(rental);
  }
}
