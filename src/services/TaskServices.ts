import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { taskReturnCategorySchema, taskReturnSchema, taskSchema } from "../schemas/task.schema";
import { TaskCreate, TaskReturn, TaskReturnCategory, TaskUpdate } from "../interfaces/task.interface";


export class TaskService {
    async create(task: TaskCreate): Promise<TaskReturn> {
        const newTask = await prisma.task.create({ data: task });

        return taskSchema.parse(newTask);
    }

    public get = async (
        category?: string
    ): Promise<Array<TaskReturnCategory>> => {
        let prismaQuery: any = { include: { category: true } };

        if (category) {
            const whereClause = { name: { equals: category, mode: "insensitive" } };
            prismaQuery = { ...prismaQuery, where: { category: whereClause } };
        }
        const allsTask = await prisma.task.findMany(prismaQuery);

        if (!allsTask.length) {
            throw new AppError("Category not found", 404);
        }
        return taskReturnCategorySchema.array().parse(allsTask);
    };

    async retrive(category?: Number): Promise<TaskReturnCategory> {
        return taskReturnCategorySchema.parse(category);
    };

    async update(taskId: string, updateData: TaskUpdate): Promise<TaskReturn> {
        const task = await prisma.task.update({
            where: { id: Number(taskId) },
            data: updateData,
        });
        return taskReturnSchema.parse(task);
    };

    async delete(taskId: string): Promise<void> {
        await prisma.task.delete({ where: { id: Number(taskId) } });
    };
};