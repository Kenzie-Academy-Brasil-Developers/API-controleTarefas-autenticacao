import express from "express";
import { CategoryController } from "../controllers/CategoryController";
import { categoryCreateSchema } from "../schemas/category.schema";
import { CategoryMiddleware } from "../middlewares/category.middleware";
import { globalError } from "../errors/handleErrors";

export const categoryRouter = express.Router();
export const controller = new CategoryController();

categoryRouter.post(
    '/',
   globalError.validBody(categoryCreateSchema),
   controller.createCategory
);

categoryRouter.use("/:categoryId", CategoryMiddleware.categoryExists);

categoryRouter.delete("/:categoryId", controller.deleteCategory);


