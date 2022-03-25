import multer from "multer";
import { Router } from "express";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/create-category.controller";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/import-category.controller";
import { FindCategoriesController } from "../modules/cars/useCases/findCategories/find-categories.controller";

const categoriesRoutes = Router();

const upload = multer({ dest: "./temp" });

const createCategoryController = new CreateCategoryController();
const findCategoriesController = new FindCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get("/", findCategoriesController.handle);
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
