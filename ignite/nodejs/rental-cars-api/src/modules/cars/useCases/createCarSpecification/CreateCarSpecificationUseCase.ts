import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/app-error";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICreateRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(request: IRequest): Promise<Car> {
    const { car_id, specifications_id } = request;
    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car not exists!");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;
    await this.carRepository.create(carExists);
    return carExists;
  }
}
