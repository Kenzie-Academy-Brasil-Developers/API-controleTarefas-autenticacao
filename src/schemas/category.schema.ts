import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().nonpositive(),
    name: z.string().min(1),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });

