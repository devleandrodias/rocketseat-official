import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/app-error";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async execute(request: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const { car_id, user_id, expected_return_date } = request;

    const isCarUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );

    if (isCarUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("Invalid return time");
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carRepository.updateAvailable(car_id, false);

    return rental;
  }
}
