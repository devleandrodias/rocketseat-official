import { inject, injectable } from "tsyringe";
import { ICarImageRepository } from "@modules/cars/repositories/interfaces/ICarImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const carImagesPromisses = images_name.map((image_name) =>
      this.carImageRepository.create(car_id, image_name)
    );

    await Promise.all(carImagesPromisses);
  }
}
