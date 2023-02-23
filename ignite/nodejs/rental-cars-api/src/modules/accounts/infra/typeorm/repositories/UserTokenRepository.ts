import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { ICreateUserTokenDto } from "@modules/accounts/dtos/ICreateUserTokenDto";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

import { UserToken } from "../entities/UserToken";

export class UserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserToken);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDto): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    return this.repository.save(userToken);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    id: string,
    refreshToken: string
  ): Promise<UserToken> {
    return this.repository.findOne({
      where: {
        user_id: id,
        refresh_token: refreshToken,
      },
    });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return this.repository.findOne({
      where: { refresh_token: refreshToken },
    });
  }
}
