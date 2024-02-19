import { z } from "zod";
import { taskCreateSchema, taskSchema } from "../schemas/task.schema";

type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskReturn = z.infer<typeof taskSchema>;

export { TaskCreate, TaskReturn };