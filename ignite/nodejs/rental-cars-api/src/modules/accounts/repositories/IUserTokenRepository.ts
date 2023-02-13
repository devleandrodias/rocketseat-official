import { UserToken } from "../infra/typeorm/entities/UserToken";
import { ICreateUserTokenDto } from "../dtos/ICreateUserTokenDto";

export interface IUserTokenRepository {
  deleteById(id: string): Promise<void>;
  create(data: ICreateUserTokenDto): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string
  ): Promise<UserToken>;
}
