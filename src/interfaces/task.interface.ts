import { z } from "zod";
import {
    taskCreateSchema,
    taskReturnSchema,
    taskSchema,
    taskUpdateSchema,
} from "../schemas/task.schema";

export type TaskCreate = z.infer<typeof taskCreateSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;
export type TaskReturn = z.infer<typeof taskSchema>;
export type TaskReturnCategory = z.infer<typeof taskReturnSchema>;

