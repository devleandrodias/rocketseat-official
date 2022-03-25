import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUserRepository } from "../../repositories/user.repository.interface";

interface IUpdateUserAvatarRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (user.avatar) await deleteFile(`./temp/avatar/${user.avatar}`);

    user.avatar = avatarUrl;

    await this.userRepository.create(user);
  }
}
