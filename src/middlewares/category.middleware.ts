import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class CategoryMiddleware {
    public categoryExists = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { categoryId } = req.params;

        const foundCategory = await prisma.category.findFirst({
            where: { id: Number(categoryId) },
        });
        if (!foundCategory) {
            throw new AppError("Category not found", 404);
        }
        res.locals = { ...res.locals, foundCategory };
        return next();
    };
};
