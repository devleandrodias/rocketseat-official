import { container } from "tsyringe";

import { envs } from "@config/envs";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

import { DayjsDateProvider } from "./dateProvider/implementations/dayjsDateProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/localStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IDateProvider>(
  DayjsDateProvider.name,
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  EtherealMailProvider.name,
  new EtherealMailProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[envs.storageDisk as "local" | "s3"]
);
