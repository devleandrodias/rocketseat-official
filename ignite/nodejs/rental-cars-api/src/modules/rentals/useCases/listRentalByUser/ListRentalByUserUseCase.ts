import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

@injectable()
export class ListRentalByUserUseCase {
  constructor(
    @inject("RentalRepository") private rentalRepository: IRentalRepository
  ) {}

  async execute(userId: string): Promise<Rental[]> {
    return this.rentalRepository.findByUserId(userId);
  }
}
