import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IStorageProvider } from "@shared/container/providers/storageProvider/IStorageProvider";

interface IUpdateUserAvatarRequest {
  userId: string;
  avatarUrl: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    userId,
    avatarUrl,
  }: IUpdateUserAvatarRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarUrl, "avatar");

    user.avatar = avatarUrl;

    await this.userRepository.create(user);
  }
}
