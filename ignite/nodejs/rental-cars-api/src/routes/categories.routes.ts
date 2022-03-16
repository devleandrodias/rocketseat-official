import { Router } from "express";
import { CategoryRepository } from "../repositories/categories.repository";
import { CreateCategoryService } from "../services/categories/create-category.service";

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.get("/", (_, res) => {
  return res.status(200).json(categoriesRepository.find());
});

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

export { categoriesRoutes };
