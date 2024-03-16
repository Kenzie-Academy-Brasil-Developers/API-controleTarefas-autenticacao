import { Category } from "@prisma/client";
import { prisma } from "../database/prisma";
import { CategoryCreate } from "../interfaces/category.interface";

export class CategoryService {
    public create = async (
        payLoad: CategoryCreate,
        userId: number
        ): Promise<Category> => {
        return await prisma.category.create({ data: { ...payLoad, userId }});
    }
    public delete = async (categoryId: number): Promise<void> => {
        await prisma.category.delete({ where: { id: categoryId } });
    };
};