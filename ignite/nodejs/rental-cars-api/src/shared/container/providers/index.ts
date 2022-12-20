import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/localStorageProvider";
import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider";
import { DayjsDateProvider } from "./dateProvider/implementations/dayjsDateProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IDateProvider>(
  DayjsDateProvider.name,
  DayjsDateProvider
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK as "local" | "s3"]
);
