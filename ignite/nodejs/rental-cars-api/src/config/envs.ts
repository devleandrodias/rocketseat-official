import "dotenv/config";

import env from "env-var";

export const envs = {
  appUrl: env.get("APP_URL").required().asUrlString(),
  appPort: env.get("APP_PORT").required().asPortNumber(),
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
  awsBucket: env.get("AWS_BUKET").required().asString(),
  awsAccessKeyId: env.get("AWS_ACCESS_KEY_ID").required().asString(),
  awsDefaultRegion: env.get("AWS_DEFAULT_REGION").required().asString(),
  awsSecretAccessKey: env.get("AWS_SECRET_ACCESS_KEY").required().asString(),
};
