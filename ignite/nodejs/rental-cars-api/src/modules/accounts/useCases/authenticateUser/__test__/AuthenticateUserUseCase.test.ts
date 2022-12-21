import "reflect-metadata";

import { ICreateUserDto } from "../../../dtos/ICreateUserDto";
import { AppError } from "../../../../../shared/errors/app-error";
import { AuthenticateUserUseCase } from "../AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../createUser/CreateUserUseCase";
import { UserRepositoryInMemory } from "@modules/accounts/infra/inMemory/UserRepositoryInMemory";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
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

  it("should not be able to authenticate with non existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "no-existing@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with invalid credentials", () => {
    expect(async () => {
      const user: ICreateUserDto = {
        name: "User Test",
        email: "user@test.com",
        password: "123456",
        driver_license: "000123",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "pass1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
