import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { AppError } from "@shared/errors/app-error";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;

    const rental = await this.rentalRepository.findById(id);
    const car = await this.carRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay < 0) {
      const calculateFine = delay * car.fine_amount;
      total += calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable(car.id, true);

    return rental;
  }
}
