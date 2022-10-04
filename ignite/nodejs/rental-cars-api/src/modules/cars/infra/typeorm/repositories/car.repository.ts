import { Repository } from "typeorm";

import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";

import { Car } from "../entities/car";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create({
    brand,
    name,
    daily_rate,
    description,
    fine_amount,
    category_id,
    license_plate,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      category_id,
      license_plate,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }
}
