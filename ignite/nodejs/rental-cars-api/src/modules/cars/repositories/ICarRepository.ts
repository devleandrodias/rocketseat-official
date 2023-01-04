import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
