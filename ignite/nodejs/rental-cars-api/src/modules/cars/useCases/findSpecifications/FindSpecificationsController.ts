import { container } from "tsyringe";
import { Request, Response } from "express";
import { FindSpecificationsUseCase } from "./FindSpecificationsUseCase";

export class FindSpecificationsController {
  async handle(_: Request, res: Response): Promise<Response> {
    const findSpecificationsUseCase = container.resolve(
      FindSpecificationsUseCase
    );
    return res.status(200).json(await findSpecificationsUseCase.execute());
  }
}
