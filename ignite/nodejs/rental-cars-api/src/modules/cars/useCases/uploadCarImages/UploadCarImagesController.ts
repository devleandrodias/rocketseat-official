import { container } from "tsyringe";
import { Request, Response } from "express";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFile {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const images = req.files as IFile[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);
    const fileNames = images.map((image) => image.filename);
    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name: fileNames,
    });

    return res.status(201).send();
  }
}
