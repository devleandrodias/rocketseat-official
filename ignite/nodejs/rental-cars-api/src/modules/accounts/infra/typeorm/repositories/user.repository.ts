import { Repository } from "typeorm";
import { User } from "../entities/user";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICreateUserDto } from "@modules/accounts/dtos/create-user.dto";
import { IUserRepository } from "@modules/accounts/repositories/user.repository.interface";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDto): Promise<void> {
    const { name, email, password, driverLicense, id, avatar } = data;

    const user = this.repository.create({
      id,
      name,
      email,
      avatar,
      password,
      driverLicense,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }
}
