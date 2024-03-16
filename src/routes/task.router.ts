import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { authMiddleware, ensureMiddleware } from "../middlewares";

export const taskRouter = Router();

const taskController = new TaskController();

taskRouter.use(authMiddleware.validateToken);

taskRouter.post(
    "",
    ensureMiddleware.bodyIsValid(taskCreateSchema),
    ensureMiddleware.categoryIdBody,
    taskController.create
);

taskRouter.get("", taskController.read);

taskRouter.use(
    "/:taskId",
    ensureMiddleware.taskIdParams,
    authMiddleware.isTaskOwner
);

taskRouter.get("/:taskId", taskController.retrieve);
taskRouter.patch(
    "/:taskId",
    ensureMiddleware.bodyIsValid(taskUpdateSchema),
    ensureMiddleware.categoryIdBody,
    taskController.partialUpdate
);

taskRouter.delete("/:taskId", taskController.delete);

