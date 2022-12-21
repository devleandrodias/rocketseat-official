import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { ICarRepository } from "@modules/cars/repositories/ICreateRepository";

import { Car } from "../typeorm/entities/Car";

export class CarRepositoryInMemory implements ICarRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name: data.name,
      brand: data.brand,
      available: true,
      description: data.description,
      category_id: data.category_id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((x) => x.license_plate === licensePlate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available)
      .filter((car) => name && car.name === name)
      .filter((car) => brand && car.brand === brand)
      .filter((car) => category_id && car.category_id === category_id);
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
