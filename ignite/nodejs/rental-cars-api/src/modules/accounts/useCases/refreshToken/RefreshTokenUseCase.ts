import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { envs } from "@config/envs";
import { AppError } from "@shared/errors/app-error";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

interface IJwtPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, envs.jwtRefreshToken) as IJwtPayload;

    const user_id = sub;

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const {
      jwtToken,
      jwtExpires,
      jwtRefreshToken,
      jwtRefreshTokenDays,
      jwtRefreshTokenExpires,
    } = envs;

    const refresh_token = sign({ email }, jwtRefreshToken, {
      subject: user_id,
      expiresIn: jwtRefreshTokenExpires,
    });

    const expires_date = this.dateProvider.addDays(jwtRefreshTokenDays);

    await this.userTokenRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    const newToken = sign({}, jwtToken, {
      subject: user_id,
      expiresIn: jwtExpires,
    });

    return {
      token: newToken,
      refreshToken: refresh_token,
    };
  }
}
