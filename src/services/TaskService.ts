import { Task } from "@prisma/client";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { taskReturnCategorySchema, taskReturnSchema } from "../schemas";
import { 
    TaskCreate,
    TaskReturn,
    TaskReturnCategory,
    TaskUpdate
} from "../interfaces";

export class TaskService {
    public create = async (
        payload: TaskCreate,
        userId: number
    ): Promise<TaskReturn> => {
        const newTask = await prisma.task.create({ data: { ...payload, userId } });

        return taskReturnSchema.parse(newTask);
    }

    public read = async (
        userId: number,
        category?: string
        ): Promise<Array<TaskReturnCategory>> => {
        let prismaQuery: any = { include: { category: true }, where: { userId }};

        if (category) {
            const whereClause = { name: { equals: category, mode: "insensitive" } };
            prismaQuery = { ...prismaQuery, where: { ...prismaQuery.where, category: whereClause } };
        }

        const allTasks = await prisma.task.findMany(prismaQuery);

        if (!allTasks.length) {
            throw new AppError("Category not found", 404);
        }
        return allTasks.map(task => taskReturnCategorySchema.parse(task));
    };

    public retrive = async (foundTask: Task): Promise<TaskReturnCategory> => {
        return taskReturnCategorySchema.parse(foundTask);
    };

    public partialUpdate = async (
        taskId: number,
        payload: TaskUpdate
        ): Promise<TaskReturn> => {
        const updateTask = await prisma.task.update({
            data: payload,
            where: { id: taskId },
        });
        return taskReturnSchema.parse(updateTask);
    };

    public delete = async (taskId: string): Promise<void> => {
        await prisma.task.delete({ where: { id: Number(taskId) } });
    };
};