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
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id, end_date: null } });
  }

  async create(data: ICreateRentalDto): Promise<Rental> {
    const { id, end_date, total, car_id, user_id, expected_return_date } = data;

    const rental = this.repository.create({
      id,
      end_date,
      total,
      car_id,
      user_id,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOneBy({ id });
  }
}
