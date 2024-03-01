import { z } from "zod";
import baseSchema from "./base.schema";
import { categorySchema } from "./category.schema";

export const taskSchema = baseSchema.extend({
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
});

export const taskCreateSchema = taskSchema.omit({ id: true });

export const taskUpdateSchema = taskSchema
    .partial()
    .omit({ id: true, category: true });

export const taskReturnSchema = taskSchema.extend({
    categoryId: z.number().positive().nullish(),
});

export const taskReturnCategorySchema = taskSchema
    .extend({
        category: categorySchema.nullish(),
    })
    .omit({ categoryId: true });