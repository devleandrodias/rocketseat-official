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
  jwtToken: env.get("JWT_TOKEN").required().asString(),
  jwtExpires: env.get("JWT_EXPIRES").required().asString(),
  jwtRefreshToken: env.get("JWT_REFRESH_TOKEN").required().asString(),
  jwtRefreshTokenDays: env.get("JWT_REFRESH_TOKEN_DAYS").required().asInt(),
  jwtRefreshTokenExpires: env
    .get("JWT_REFRESH_TOKEN_EXPIRES")
    .required()
    .asString(),
};
