import { Category } from "@prisma/client";
import { prisma } from "../database/prisma";
import { CategoryCreate } from "../interfaces/category.interface";

export class CategoryService {
    async create(payLoad: CategoryCreate): Promise<Category> {
        const data = await prisma.category.create({ data: payLoad });
        return data;
    }
    async delete(categoryId: number): Promise<void> {
        await prisma.category.delete({ where: { id: categoryId } });
    };
};