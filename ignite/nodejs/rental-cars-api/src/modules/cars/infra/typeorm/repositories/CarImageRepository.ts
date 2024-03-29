import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";

import { CarImage } from "../entities/CarImage";

export class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });
    await this.repository.save(carImage);
    return carImage;
  }
}
