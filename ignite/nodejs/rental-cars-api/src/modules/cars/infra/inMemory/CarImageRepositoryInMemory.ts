import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImageRepository } from "../../repositories/ICarImageRepository";

export class CarImageRepositoryInMemory implements ICarImageRepository {
  private carImages: CarImage[] = [];

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      car_id,
      image_name,
    });

    this.carImages.push(carImage);

    return carImage;
  }
}
