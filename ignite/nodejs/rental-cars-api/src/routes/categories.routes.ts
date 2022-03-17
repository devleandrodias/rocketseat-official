import { Router } from "express";
import { createCategoryController } from "../modules/cars/use-cases/createCategory";
import { findCategoriesController } from "../modules/cars/use-cases/findCategories";

const categoriesRoutes = Router();

categoriesRoutes.get("/", (req, res) => {
  return findCategoriesController.handle(req, res);
});

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

export { categoriesRoutes };
