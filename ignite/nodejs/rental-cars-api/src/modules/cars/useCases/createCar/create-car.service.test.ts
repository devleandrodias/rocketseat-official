import { AppError } from "@shared/errors/app-error";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarRepositoryInMemory } from "@modules/cars/repositories/implementations/CarRepositoryInMemory";

import { CreateCarService } from "./create-car.service";

let carRepository: CarRepositoryInMemory;
let createCarService: CreateCarService;

describe("Create car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
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

  it.skip("should not be able to create a car with the same license plate", async () => {
    await createCarService.execute({
      brand: "VW",
      name: "Fusca",
      daily_rate: 100,
      fine_amount: 60,
      description: "Common car",
      license_plate: "ABC-1234",
      category_id: "category",
    });

    expect(
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
