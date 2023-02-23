import { v4 } from "uuid";
import { resolve } from "node:path";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/app-error";

import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { envs } from "@config/envs";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = v4();
    const expires_date = this.dateProvider.addHours(3);

    await this.userTokenRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );

    const variables = {
      name: user.name,
      link: `${envs.appUrl}/password/reset?token=${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperacao de senha",
      variables,
      templatePath
    );
  }
}
