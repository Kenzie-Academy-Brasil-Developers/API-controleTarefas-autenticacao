import express, { Application } from "express";
import "express-async-errors";
import "reflect-metadata";
import helmet from "helmet";
import { TaskController } from "./controllers/TaskController";
import { taskRouter } from "./routers/task.router";
import { categoryRouter } from "./routers/category.router";
import { GlobalError } from "./errors/handleErrors";

export const app: Application = express();

app.use(helmet());
app.use(express.json());

export const taskController = new TaskController();
export const globalErrors = new GlobalError();

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);

app.use(globalErrors.handleErros);