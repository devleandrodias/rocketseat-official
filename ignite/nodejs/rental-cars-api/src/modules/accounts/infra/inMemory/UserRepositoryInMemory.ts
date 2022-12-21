import { ICreateUserDto } from "@modules/accounts/dtos/ICreateUserDto";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

import { User } from "../typeorm/entities/User";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User> {
    return this.users.find((x) => x.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((x) => x.email === email);
  }

  async create({
    email,
    name,
    password,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
      driver_license,
    });

    this.users.push(user);
  }
}
