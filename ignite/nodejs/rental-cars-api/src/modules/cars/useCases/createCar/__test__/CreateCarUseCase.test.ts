import { AppError } from "@shared/errors/app-error";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarRepositoryInMemory } from "@modules/cars/infra/inMemory/CarRepositoryInMemory";

import { CreateCarUseCase } from "../CreateCarUseCase";

let carRepository: CarRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepository);
  });

  it("should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
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
    await createCarUseCase.execute({
      brand: "VW",
      name: "Fusca",
      daily_rate: 100,
      fine_amount: 60,
      description: "Common car",
      license_plate: "ABC-1234",
      category_id: "category",
    });

    expect(
      await createCarUseCase.execute({
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

  it("should be able to create a car with available true as default", async () => {
    const car = await createCarUseCase.execute({
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
