import "reflect-metadata";

import { AppError } from "@shared/errors/app-error";

import { CreateCategoryUseCase } from "../CreateCategoryUseCase";
import { CreateCategoryRepositoryInMemory } from "@modules/cars/infra/inMemory/CategoryRepositoryInMemory";

let createCategoryUseCase: CreateCategoryUseCase;
let createCategoryRepository: CreateCategoryRepositoryInMemory;

describe("CreateCategory", () => {
  beforeEach(() => {
    createCategoryRepository = new CreateCategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(createCategoryRepository);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Name Test",
      description: "Description Test",
    };

    await createCategoryUseCase.execute({
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

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
