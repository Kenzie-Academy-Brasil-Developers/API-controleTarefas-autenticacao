import "express-async-errors";
import express, { json } from "express";
import "reflect-metadata";
import helmet from "helmet";
import { TaskController } from "./controllers/TaskController";;
import { categoryRouter, taskRouter, userRouter } from "./routes";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(helmet());
app.use(express.json());

export const taskController = new TaskController();

app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);

app.use(handleErrors.execute);