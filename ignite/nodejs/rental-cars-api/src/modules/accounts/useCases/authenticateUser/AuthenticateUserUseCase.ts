import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/app-error";
import { IUserRepository } from "../../repositories/IUserRepository";

import { envs } from "@config/envs";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Email and/or password incorrect!");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email and/or password incorrect!");

    const {
      jwtToken,
      jwtExpires,
      jwtRefreshToken,
      jwtRefreshTokenDays,
      jwtRefreshTokenExpires,
    } = envs;

    const token = sign({}, jwtToken, {
      subject: user.id,
      expiresIn: jwtExpires,
    });

    const refresh_token = sign({ email }, jwtRefreshToken, {
      subject: user.id,
      expiresIn: jwtRefreshTokenExpires,
    });

    const expires_date = this.dateProvider.addDays(jwtRefreshTokenDays);

    await this.userTokenRepository.create({
      expires_date,
      refresh_token,
      user_id: user.id,
    });

    return {
      token,
      refreshToken: refresh_token,
      user: { name: user.name, email: user.email },
    };
  }
}
