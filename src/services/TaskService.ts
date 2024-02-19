import { Task } from "vitest";
import { prisma } from "../database/prisma";
import { TaskCreate, TaskReturn } from "../interfaces/task.interface";
import { taskSchema } from "../schemas/task.schema";

export class TaskService {
    public create = async (payLoad: TaskCreate): Promise<TaskReturn> => {
        const task = await prisma.task.create({
            data: payLoad,
            include: { categories: true}
        })
        return taskSchema.parse(task);
    };

    public read = async (): Promise<Array<TaskReturn>> => {
        const task = await prisma.task.findMany({ include: { recupes: true}});
        return taskSchema.array().parse(task);
    };
};