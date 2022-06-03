import "reflect-metadata";

import { AppError } from "@shared/errors/app-error";
import { CreateCategoryService } from "./create-category.service";
import { CreateCategoryRepositoryFake } from "../../repositories/implementations/category.repository.fake";

let createCategoryService: CreateCategoryService;
let createCategoryRepository: CreateCategoryRepositoryFake;

describe("CreateCategory", () => {
  beforeEach(() => {
    createCategoryRepository = new CreateCategoryRepositoryFake();
    createCategoryService = new CreateCategoryService(createCategoryRepository);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Name Test",
      description: "Description Test",
    };

    await createCategoryService.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await createCategoryRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with same name", async () => {
    expect(async () => {
      const category = {
        name: "Name Test",
        description: "Description Test",
      };

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryService.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
