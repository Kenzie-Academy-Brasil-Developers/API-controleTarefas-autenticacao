import { z } from "zod";
import baseSchema from "./base.schema";
import { taskSchema } from "./task.schema";

const categorySchema = baseSchema.extend({
    id: z.number().min(1).max(4),
    name: z.string(),

    owner: taskSchema,
});

const categoryCreateSchema = categorySchema
    .omit({ id: true, owner: true })
    .extend({
        owner: z.string().email().max(255)
    });

const categoryReturnSchema = categorySchema;

export { categoryCreateSchema, categoryReturnSchema, categorySchema};
