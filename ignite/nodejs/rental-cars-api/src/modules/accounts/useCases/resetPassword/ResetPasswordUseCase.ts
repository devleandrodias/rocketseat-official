import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/app-error";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    const currentDate = this.dateProvider.dateNow();
    const dateIsExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      currentDate
    );

    if (dateIsExpired) {
      throw new AppError("Token expired!");
    }

    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.create(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}
