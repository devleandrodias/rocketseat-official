import { AppError } from "@shared/errors/app-error";
import { CarRepositoryInMemory } from "@modules/cars/repositories/implementations/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/implementations/SpecificationRepositoryInMemory";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carRepository: CarRepositoryInMemory;
let specificationRepository: SpecificationRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create car specification", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    specificationRepository = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepository,
      specificationRepository
    );
  });

  it("should not be able to add a new specification to not existent car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["54639"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepository.create({
      brand: "VW",
      name: "Fusca",
      daily_rate: 100,
      fine_amount: 60,
      description: "Common car",
      license_plate: "ABC-1234",
      category_id: "category_id",
    });

    const specification = await specificationRepository.create({
      name: "Opcionais",
      description: "Teto solar",
    });

    const specifications_id = [specification.id];

    const carWithSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(carWithSpecifications).toHaveProperty("specifications");
    expect(carWithSpecifications.specifications.length).toBe(1);
  });
});
