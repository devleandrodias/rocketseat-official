import { container } from "tsyringe";
import { IStorageProvider } from "./storageProvider/IStorageProvider";

import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/localStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK as "local" | "s3"]
);
