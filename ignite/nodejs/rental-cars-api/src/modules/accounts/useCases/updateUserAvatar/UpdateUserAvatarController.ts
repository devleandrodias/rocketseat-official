import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarUrl = req.file.filename;

    const updateUseAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUseAvatarUseCase.execute({ userId: id, avatarUrl });

    return res.status(204).send();
  }
}
