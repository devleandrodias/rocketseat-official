import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../erros/app-error";
import { IUserRepository } from "../../repositories/user.repository.interface";

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
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Email and/or password incorrect!");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email and/or password incorrect!");

    const token = sign({}, "8a2b50286d2051d88021c5b0e971e56a9c5e75f3", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user: { name: user.name, email: user.email }, token };
  }
}
