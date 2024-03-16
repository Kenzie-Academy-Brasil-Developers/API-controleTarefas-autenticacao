import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { categoryCreateSchema } from "../schemas/category.schema";
import { authMiddleware, ensureMiddleware } from "../middlewares";

export const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.use(authMiddleware.validateToken);

categoryRouter.post(
    "",
  ensureMiddleware.bodyIsValid(categoryCreateSchema),
  categoryController.create
);

categoryRouter.use(
    "/:categoryId",
    ensureMiddleware.categoryIdParams,
    authMiddleware.isCategoryOwner
    );

categoryRouter.delete("/:categoryId", categoryController.delete);


