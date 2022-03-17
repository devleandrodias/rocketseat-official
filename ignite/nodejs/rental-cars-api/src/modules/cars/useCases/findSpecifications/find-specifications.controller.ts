import { Request, Response } from "express";
import { FindSpecificationsService } from "./find-specifications.service";

export class FindSpecificationsController {
  constructor(private service: FindSpecificationsService) {}

  handle(_: Request, res: Response): Response {
    return res.status(200).json(this.service.execute());
  }
}
