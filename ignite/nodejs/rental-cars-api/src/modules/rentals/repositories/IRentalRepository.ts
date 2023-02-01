import { ICreateRentalDto } from "../dto/ICreateRentalDto";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalRepository {
  create(data: ICreateRentalDto): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}
