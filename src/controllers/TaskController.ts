import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService: TaskService = new TaskService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const userId = Number(res.locals.sub);
        const newTask = await this.taskService.create(req.body, userId);
        return res.status(201).json(newTask);
    };

    public read = async (req: Request, res: Response
    ): Promise<Response> => {
        const userId = Number(res.locals.sub);
        const category = req.query.category ? String(req.query.category) : undefined;
        const allsTask = await this.taskService.read(userId, category);
        return res.status(200).json(allsTask);
    };

    public retrieve = async ( req: Request, res: Response): Promise<Response> => {
        const foundTask = await this.taskService.retrive(res.locals.foundTask);
        return res.status(200).json(foundTask);
    };

    public partialUpdate = async (req: Request, res: Response): Promise<Response> => {
        const taskId = Number(req.params.taskId);
        const updatedTask = await this.taskService.partialUpdate(taskId, req.body);
        return res.status(200).json(updatedTask);
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        const taskId = Number(req.params.taskId);
        await this.taskService.delete(String(taskId));
        return res.status(204).json();
    };
};