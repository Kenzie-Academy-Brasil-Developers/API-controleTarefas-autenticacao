import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class TaskMiddleware {
    public taskExists = async (
        req: Request, res: Response, next: NextFunction
    ): Promise<void> => {
        const { taskId } = req.params;

        const foundTask = await prisma.task.findFirst({
            where: { id: Number(taskId) },
            include: { category: true },
        });
        if (!foundTask) {
            throw new AppError("Task not found", 404);
        }
        res.locals = { ...res.locals, foundTask };
        return next();
    };

    public bodyCategoryIdExists = async (
        { body: { categoryId } }: Request,
        res: Response, next: NextFunction
    ): Promise<void> => {
        const foundOwner = await prisma.task.findFirst({
            where: { id: Number(categoryId) },
        });
        if (!foundOwner) {
            throw new AppError("category not found!", 404);
        }
        return next();
    };
    public categoryIdBody = async (
        req: Request, res: Response, next: NextFunction
    ): Promise<void> => {
        const { categoryId } = req.body;
        if (!categoryId) return next();
        const foundCategory = await prisma.category.findFirst({
            where: { id: categoryId },
        });
        if (!foundCategory) {
            throw new AppError("Category not found", 404);
        }
        return next();
    };
};

export const taskMiddlewares = new TaskMiddleware();
