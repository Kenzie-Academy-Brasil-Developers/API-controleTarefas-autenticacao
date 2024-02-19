import { z } from "zod";
import baseSchema from "./base.schema";
import { categorySchema } from "./category.schema";

const taskSchema = baseSchema.extend({
    id: z.number(),
    title: z.string().min(3).max(255),
    content: z.string().max(255),
    category: z.number(),

    categories: baseSchema.extend({
        id: z.number().min(3),
        name: z.string().min(1)
    })
});

const taskCreateSchema = taskSchema.omit({id: true, categories: true});

export { taskCreateSchema, taskSchema};