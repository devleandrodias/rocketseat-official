import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/app-error";
import { IUserRepository } from "../../repositories/user.repository.interface";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject("UserRepository")
    private repository: IUserRepository
  ) {}

  async execute(data: ICreateUserRequest) {
    const { name, email, password, driverLicense } = data;

    if (await this.repository.findByEmail(email)) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.repository.create({
      name,
      email,
      driverLicense,
      password: passwordHash,
    });
  }
}
