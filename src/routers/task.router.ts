import { Router } from "express";
import { GlobalError } from "../errors/handleErrors";
import { TaskController } from "../controllers/TaskController";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { taskMiddlewares } from "../middlewares/task.middlewares";

export const taskRouter = Router();
export const controller = new TaskController();

taskRouter.post(
    '/',
    GlobalError.validBody(taskCreateSchema),
    taskMiddlewares.categoryIdBody,
    controller.create
);
taskRouter.get('/', controller.getTask);

taskRouter.use("/:taskId", taskMiddlewares.taskExists);

taskRouter.get("/:taskId", controller.retriveTask);

taskRouter.patch(
    "/:taskId",
    GlobalError.validBody(taskUpdateSchema),
    controller.updateTask
);

taskRouter.delete("/:taskId", controller.deleteTask)
