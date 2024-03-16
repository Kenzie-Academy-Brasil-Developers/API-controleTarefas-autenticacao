import { z } from "zod";
import {
    taskCreateSchema,
    taskUpdateSchema,
    taskReturnSchema,
    taskReturnCategorySchema,
} from "../schemas";

export type TaskCreate = z.infer<typeof taskCreateSchema>;

export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

export type TaskReturn = z.infer<typeof taskReturnSchema>;

export type TaskReturnCategory = z.infer<typeof taskReturnCategorySchema>;

