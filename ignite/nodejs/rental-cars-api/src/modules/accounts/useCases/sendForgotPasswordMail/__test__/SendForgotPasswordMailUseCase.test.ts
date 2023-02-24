import { UserRepositoryInMemory } from "@modules/accounts/infra/inMemory/UserRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/infra/inMemory/UserTokenRepositoryInMemory";

import { AppError } from "@shared/errors/app-error";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/dayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/MailProviderInMemory";

import { SendForgotPasswordMailUseCase } from "../SendForgotPasswordMailUseCase";

describe("[SendForgotPasswordMailUseCase]", () => {
  let dateProvider: DayjsDateProvider;
  let mailProviderInMemory: MailProviderInMemory;
  let userRepositoryInMemory: UserRepositoryInMemory;
  let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be definied", () => {
    expect(sendForgotPasswordMailUseCase).toBeDefined();
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMailSpy = spyOn(mailProviderInMemory, "sendMail");

    await userRepositoryInMemory.create({
      email: "teste@teste.com",
      name: "John Doe",
      password: "65331",
      driver_license: "511515",
    });

    await sendForgotPasswordMailUseCase.execute("teste@teste.com");

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("random@test.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an user token", async () => {
    const userTokenCreateSpy = spyOn(userRepositoryInMemory, "create");

    await userRepositoryInMemory.create({
      email: "teste2@teste.com",
      name: "John Doe 2",
      password: "65331",
      driver_license: "511515",
    });

    await sendForgotPasswordMailUseCase.execute("teste2@teste.com");

    expect(userTokenCreateSpy).toHaveBeenCalled();
  });
});
