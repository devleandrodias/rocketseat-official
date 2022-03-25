import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindSpecificationsService } from "./find-specifications.service";

export class FindSpecificationsController {
  async handle(_: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindSpecificationsService);
    return res.status(200).json(await service.execute());
  }
}
