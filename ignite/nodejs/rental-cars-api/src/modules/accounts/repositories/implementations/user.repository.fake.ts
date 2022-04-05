import { User } from "../../infra/typeorm/entities/user";
import { ICreateUserDto } from "../../dtos/create-user.dto";
import { IUserRepository } from "../user.repository.interface";

export class UserRepositoryFake implements IUserRepository {
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
    driverLicense,
  }: ICreateUserDto): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      password,
      driverLicense,
    });

    this.users.push(user);
  }
}
