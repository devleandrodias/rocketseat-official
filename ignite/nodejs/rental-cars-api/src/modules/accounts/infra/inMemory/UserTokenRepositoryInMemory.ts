import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

import { UserToken } from "../typeorm/entities/UserToken";

export class UserTokenRepositoryInMemory implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDto): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { refresh_token, expires_date, user_id });

    this.userTokens.push(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    this.userTokens.filter((userToken) => userToken.id !== id);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refreshToken
    );
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    return this.userTokens.find(
      (userToken) =>
        userToken.refresh_token === refreshToken && userToken.user_id === userId
    );
  }
}
