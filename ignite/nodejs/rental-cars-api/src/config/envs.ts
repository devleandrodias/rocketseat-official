import "dotenv/config";

import env from "env-var";

export const envs = {
  port: env.get("PORT").required().asPortNumber(),
  storageDisk: env.get("DISK").required().asString(),
  databaseHost: env.get("DATABASE_HOST").required().asString(),
  databasePort: env.get("DATABASE_PORT").required().asPortNumber(),
  databaseUsername: env.get("DATABASE_USERNAME").required().asString(),
  databasePassword: env.get("DATABASE_PASSWORD").required().asString(),
  databaseDatabase: env.get("DATABASE_DATABASE").required().asString(),
};
