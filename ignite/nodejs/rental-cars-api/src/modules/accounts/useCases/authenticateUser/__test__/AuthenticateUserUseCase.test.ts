import "reflect-metadata";

import { ICreateUserDto } from "../../../dtos/ICreateUserDto";
import { AppError } from "../../../../../shared/errors/app-error";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { UserRepositoryInMemory } from "@modules/accounts/infra/inMemory/UserRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/infra/inMemory/UserTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/dayjsDateProvider";

let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDto = {
      name: "User Test",
      email: "user@test.com",
      password: "123456",
      driver_license: "000123",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "no-existing@test.com",
        password: "123456",
      })
    ).rejects.toEqual(new AppError("Email and/or password incorrect!"));
  });

  it("should not be able to authenticate an user with invalid credentials", async () => {
    const user: ICreateUserDto = {
      name: "User Test",
      email: "user@test.com",
      password: "123456",
      driver_license: "000123",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "pass1234",
      })
    ).rejects.toEqual(new AppError("Email and/or password incorrect!"));
  });
});
