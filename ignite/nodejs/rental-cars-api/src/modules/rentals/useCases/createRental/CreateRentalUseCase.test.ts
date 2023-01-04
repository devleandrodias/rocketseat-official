import dayjs from "dayjs";

import { AppError } from "@shared/errors/app-error";
import { CarRepositoryInMemory } from "@modules/cars/infra/inMemory/CarRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/dayjsDateProvider";
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
    const rental = await createRentalUseCase.execute({
      car_id: "123",
      user_id: "123",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "111",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "222",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "111",
        user_id: "123",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        car_id: "111",
        user_id: "456",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able create a new rental with invalid time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "111",
        user_id: "123",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
