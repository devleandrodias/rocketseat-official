import request from "supertest";

import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

describe.skip("Create category", () => {
  let connection: DataSource;

  beforeAll(async () => {
    const id = uuid();
    const driverLicense = "0000-000";
    const email = "supertest@test.com";
    const password = await hash("admin", 8);

    connection = await AppDataSource.initialize();

    // await connection.runMigrations();

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, is_admin, driver_license)
      values('${id}', 'is_admin', '${email}', '${password}', true, '${driverLicense}')
    `);
  });

  afterAll(() => {
    connection.dropDatabase();
    connection.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sign-in").send({
      email: "supertest@test.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with same name", async () => {
    const responseToken = await request(app).post("/sign-in").send({
      email: "supertest@test.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
