import { User } from "../infra/typeorm/entities/User";
import { ICreateUserDto } from "../dtos/ICreateUserDto";

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDto): Promise<void>;
}
