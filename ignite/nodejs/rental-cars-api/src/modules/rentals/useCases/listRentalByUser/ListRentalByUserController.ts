import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListRentalByUserUseCase } from "./ListRentalByUserUseCase";

export class ListRentalByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase);
    const rentals = await listRentalByUserUseCase.execute(id);
    return res.json(rentals);
  }
}
