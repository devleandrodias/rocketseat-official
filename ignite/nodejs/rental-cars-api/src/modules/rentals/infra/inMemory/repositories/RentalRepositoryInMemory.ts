import { ICreateRentalDto } from "@modules/rentals/dto/ICreateRentalDto";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { Rental } from "../../typeorm/entities/Rental";

export class RentalRepositoryInMemory implements IRentalRepository {
  private rentals: Rental[] = [];

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findByUserId(id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === id);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDto): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
}
