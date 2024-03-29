import { CarRepositoryInMemory } from "@modules/cars/infra/inMemory/CarRepositoryInMemory";
import { FindAvailableCarsUseCase } from "../FindAvailableCarsUseCase";

let findAvailableCarsUseCase: FindAvailableCarsUseCase;
let carsRepository: CarRepositoryInMemory;

describe.skip("List cars", () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    findAvailableCarsUseCase = new FindAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "Car_1",
      brand: "Car_brand",
      description: "Car_description",
      category_id: "1c5a24be-a8af-4310-9eb6-e9a0b41d3593",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABG-1531",
    });

    const cars = await findAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car_2",
      brand: "Car_brand_test",
      description: "Car_description",
      category_id: "1c5a24be-a8af-4310-9eb6-e9a0b41d3593",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABG-1531",
    });

    const cars = await findAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car_3",
      brand: "Car_brand_test",
      description: "Car_description",
      category_id: "1c5a24be-a8af-4310-9eb6-e9a0b41d3593",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABG-1533",
    });

    const cars = await findAvailableCarsUseCase.execute({
      name: "Car_3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepository.create({
      name: "Car_4",
      brand: "Car_brand_test",
      description: "Car_description",
      category_id: "12345",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABG-1533",
    });

    const cars = await findAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
