import dayjs from "dayjs";

import { AppError } from "@shared/errors/app-error";
import { CarRepositoryInMemory } from "@modules/cars/infra/inMemory/CarRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/dayjsDateProvider";
import { RentalRepositoryInMemory } from "@modules/rentals/infra/inMemory/repositories/RentalRepositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  let dayjsDateProvider: DayjsDateProvider;
  let createRentalUseCase: CreateRentalUseCase;
  let carRepositoryInMemory: CarRepositoryInMemory;
  let rentalRepositoryInMemory: RentalRepositoryInMemory;

  beforeEach(() => {
    dayjsDateProvider = new DayjsDateProvider();
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalRepositoryInMemory,
      carRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carRepositoryInMemory.create({
      name: "teste",
      description: "car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "test",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able create a new rental if there is another open to the same user", async () => {
    await rentalRepositoryInMemory.create({
      car_id: "1111",
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "222",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able create a new rental if there is another open to the same car", async () => {
    await rentalRepositoryInMemory.create({
      car_id: "test",
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "111",
        user_id: "456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user"));
  });

  it("should not be able create a new rental with invalid time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "111",
        user_id: "123",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
