import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateUserAvatarService } from "./update-user-avatar.service";

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const avatarUrl = req.file.filename;

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    await updateUserAvatarService.execute({ userId: id, avatarUrl });

    return res.status(204).send();
  }
}
