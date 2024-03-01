import { z } from "zod";
import baseSchema from "./base.schema";

export const categorySchema = baseSchema.extend({
    name: z.string().min(1),
});

export const categoryCreateSchema = categorySchema
    .omit({ id: true, owner: true });

export const categoryReturnSchema = categorySchema;
