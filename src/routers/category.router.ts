import express from "express";
import { CategoryController } from "../controllers/CategoryController";
import { categoryCreateSchema } from "../schemas/category.schema";
import { CategoryMiddleware } from "../middlewares/category.middleware";
import { GlobalError } from "../errors/handleErrors";

export const categoryRouter = express.Router();
export const controller = new CategoryController();
export const middleware = new CategoryMiddleware();

categoryRouter.post(
    '/',
   GlobalError.validBody(categoryCreateSchema),
   controller.createCategory
);

categoryRouter.use("/:categoryId", middleware.categoryExists);

categoryRouter.delete("/:categoryId", controller.deleteCategory);


