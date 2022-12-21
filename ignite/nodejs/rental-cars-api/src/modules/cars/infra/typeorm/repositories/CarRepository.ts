import { Repository } from "typeorm";

import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDto";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICarRepository } from "@modules/cars/repositories/ICreateRepository";

import { Car } from "../entities/Car";

export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create({
    id,
    brand,
    name,
    daily_rate,
    description,
    fine_amount,
    category_id,
    license_plate,
    specifications,
  }: ICreateCarDto): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      category_id,
      license_plate,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    return carsQuery.getMany();
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOneBy({ id });
  }
}
