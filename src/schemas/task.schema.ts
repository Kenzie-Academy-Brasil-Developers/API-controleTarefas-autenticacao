import { z } from "zod";
import { categorySchema } from "./category.schema";

export const taskReturnSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
});

export const taskCreateSchema = taskReturnSchema.omit({ id: true });

export const taskUpdateSchema = taskCreateSchema.partial();

export const taskReturnCategorySchema = taskReturnSchema
    .extend({ category: categorySchema.nullish() })
    .omit({ categoryId: true });