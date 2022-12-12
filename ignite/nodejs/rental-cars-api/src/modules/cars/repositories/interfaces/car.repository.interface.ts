import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";

export interface ICarRepository {
  create(data: ICreateCarDto): Promise<Car>;
  findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
}
