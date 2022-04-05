import { User } from "../infra/typeorm/entities/user";
import { ICreateUserDto } from "../dtos/create-user.dto";

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDto): Promise<void>;
}
