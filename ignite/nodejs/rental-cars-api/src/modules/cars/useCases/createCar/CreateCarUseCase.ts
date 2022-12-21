import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/app-error";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICreateRepository";

interface ICreateCarRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    brand,
    fine_amount,
    category_id,
  }: ICreateCarRequest): Promise<Car> {
    const carAlreadyExists = await this.carRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) throw new AppError("Car already exists!");

    const car = await this.carRepository.create({
      brand,
      name,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    return car;
  }
}
