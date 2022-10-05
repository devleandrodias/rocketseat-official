import multer from "multer";
import { Router } from "express";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/create-category.controller";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/import-category.controller";
import { FindCategoriesController } from "@modules/cars/useCases/findCategories/find-categories.controller";

import { ensureAdmin } from "../middlewares/ensure-admin";
import { ensureAuthenticate } from "../middlewares/ensure-authenticate";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const findCategoriesController = new FindCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", findCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
