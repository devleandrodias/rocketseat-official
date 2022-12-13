import { ICarRepository } from "@modules/cars/repositories/interfaces/car.repository.interface";
import { AppError } from "@shared/errors/app-error";
import { inject } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute(request: IRequest): Promise<void> {
    const { car_id, specifications_id } = request;

    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car not exists!");
    }
  }
}
