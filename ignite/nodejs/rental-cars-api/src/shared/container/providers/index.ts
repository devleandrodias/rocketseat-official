import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";

import { DayjsDateProvider } from "./dateProvider/implementations/dayjsDateProvider";
import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/localStorageProvider";

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
  diskStorage[process.env.DISK as "local" | "s3"]
);
