import "reflect-metadata";

import { AppError } from "@shared/errors/app-error";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/car.repository";
import { CreateCarService } from "./create-car.service";

let carRepository: CarRepository;
let createCarService: CreateCarService;

describe.skip("Create car", () => {
  beforeEach(() => {
    carRepository = new CarRepository();
    createCarService = new CreateCarService(carRepository);
  });

  it("should be able to create a car", async () => {
    const car = await createCarService.execute({
      brand: "VW",
      name: "Fusca",
      daily_rate: 100,
      fine_amount: 60,
      description: "Common car",
      license_plate: "ABC-1234",
      category_id: "category",
    });

    expect(car).toBeInstanceOf(Car);
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with the same license plate", async () => {
    await createCarService.execute({
      brand: "VW",
      name: "Fusca",
      daily_rate: 100,
      fine_amount: 60,
      description: "Common car",
      license_plate: "ABC-1234",
      category_id: "category",
    });

    await expect(
      await createCarService.execute({
        brand: "VW",
        name: "Fusca",
        daily_rate: 100,
        fine_amount: 60,
        description: "Common car",
        license_plate: "ABC-1234",
        category_id: "category",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with avaliable tru as default", async () => {
    const car = await createCarService.execute({
      brand: "VW",
      name: "Fusca",
      daily_rate: 100,
      fine_amount: 60,
      description: "Common car",
      license_plate: "ABCD-1234",
      category_id: "category",
    });

    expect(car.available).toBeTruthy();
  });
});
