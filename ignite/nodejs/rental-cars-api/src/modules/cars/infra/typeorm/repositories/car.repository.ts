import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";
import { Car } from "../entities/car";

export class CarRepository implements ICarRepository {
  cars: Car[] = [];

  async create({
    brand,
    name,
    daily_rate,
    description,
    fine_amount,
    category_id,
    license_plate,
  }: ICreateCarDto): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      name,
      daily_rate,
      description,
      fine_amount,
      category_id,
      license_plate,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }
}
