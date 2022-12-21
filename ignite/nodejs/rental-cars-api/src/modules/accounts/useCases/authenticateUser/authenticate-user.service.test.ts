import "reflect-metadata";

import { ICreateUserDto } from "../../dtos/ICreateUserDto";
import { AppError } from "../../../../shared/errors/app-error";
import { CreateUserService } from "../createUser/create-user.service";
import { AuthenticateUserService } from "./authenticate-user.service";
import { UserRepositoryInMemory } from "@modules/accounts/infra/inMemory/UserRepositoryInMemory";

let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserService: AuthenticateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    authenticateUserService = new AuthenticateUserService(
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

    await createUserService.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with non existing user", () => {
    expect(async () => {
      await authenticateUserService.execute({
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

      await createUserService.execute(user);

      await authenticateUserService.execute({
        email: user.email,
        password: "pass1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
