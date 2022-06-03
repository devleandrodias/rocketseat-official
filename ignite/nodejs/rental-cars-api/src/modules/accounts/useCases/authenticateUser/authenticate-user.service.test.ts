import "reflect-metadata";

import { AppError } from "../../../../shared/errors/app-error";
import { ICreateUserDto } from "../../dtos/create-user.dto";
import { CreateUserService } from "../createUser/create-user.service";
import { AuthenticateUserService } from "./authenticate-user.service";
import { UserRepositoryFake } from "../../repositories/implementations/user.repository.fake";

let createUserService: CreateUserService;
let userRepositoryFake: UserRepositoryFake;
let authenticateUserService: AuthenticateUserService;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    createUserService = new CreateUserService(userRepositoryFake);
    authenticateUserService = new AuthenticateUserService(userRepositoryFake);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDto = {
      name: "User Test",
      email: "user@test.com",
      password: "123456",
      driverLicense: "000123",
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
        driverLicense: "000123",
      };

      await createUserService.execute(user);

      await authenticateUserService.execute({
        email: user.email,
        password: "pass1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
