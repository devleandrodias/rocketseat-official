import { hash } from "bcrypt";
import { faker } from "@faker-js/faker";

import { AppDataSource } from "../data-source";

async function seed() {
  const id = faker.datatype.uuid();
  const email = faker.internet.email();
  const driverLicense = faker.random.numeric(7);

  const password = await hash("admin", 8);

  const connection = await AppDataSource.initialize();

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
    values('${id}', 'is_admin', '${email}', '${password}', true, '${driverLicense}')
  `);

  console.info("Seeds created with success!");

  await connection.destroy();
}

seed();
