import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentalx",
  synchronize: true,
  logging: true,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./migrations/*.ts"],
  subscribers: ["./subscribers/*.ts"],
});
