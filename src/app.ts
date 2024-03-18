import "express-async-errors";
import cors from "cors";
import express, { Application, json } from "express";
import "reflect-metadata";
import helmet from "helmet";
import { TaskController } from "./controllers/TaskController";;
import { categoryRouter, taskRouter, userRouter } from "./routes";
import { handleErrors } from "./middlewares";

export const app: Application = express();


app.use(cors());
app.use(helmet());
app.use(express.json());

export const taskController = new TaskController();

app.use("/api/user", userRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);

app.use(handleErrors.execute);