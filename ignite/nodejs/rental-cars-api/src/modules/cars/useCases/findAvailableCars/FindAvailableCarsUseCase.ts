import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";

export interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
export class FindAvailableCarsUseCase {
  constructor(
    @inject("CarRepository")
    private carsRepository: ICarRepository
  ) {}

  async execute(request: IRequest): Promise<Car[]> {
    const { name, brand, category_id } = request;
    const cars = await this.carsRepository.findAvailable(
      category_id,
      brand,
      name
    );
    return cars;
  }
}
