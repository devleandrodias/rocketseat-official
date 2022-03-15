import { Router } from "express";
import { CategoryRepository } from "../repositories/categories.repository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.get("/", (_, res) => {
  return res.status(200).json(categoriesRepository.find());
});

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!categoriesRepository.findByName(name)) {
    categoriesRepository.create({ name, description });
    return res.status(201).send();
  }

  return res.status(400).send({ message: "Category already exists!" });
});

export { categoriesRoutes };
