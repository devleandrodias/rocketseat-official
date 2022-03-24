import multer from "multer";
import { Router } from "express";
import createCategoryController from "../modules/cars/useCases/createCategory";
import findCategoriesController from "../modules/cars/useCases/findCategories";
import importCategoryController from "../modules/cars/useCases/importCategory";

const categoriesRoutes = Router();

const upload = multer({ dest: "./temp" });

categoriesRoutes.get("/", (req, res) => {
  return findCategoriesController().handle(req, res);
});

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController().handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController().handle(req, res);
});

export { categoriesRoutes };
