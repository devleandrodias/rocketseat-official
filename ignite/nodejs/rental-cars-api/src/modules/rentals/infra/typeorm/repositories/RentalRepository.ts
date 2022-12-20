import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICreateRentalDto } from "@modules/rentals/dto/ICreateRentalDto";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { Rental } from "../entities/Rental";

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id } });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id } });
  }

  async create(data: ICreateRentalDto): Promise<Rental> {
    const { car_id, user_id, expected_return_date } = data;

    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
}
