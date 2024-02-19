import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
    private taskService = new TaskService();

    public create = async (req: Request, res: Response):Promise<Response> => {
        return res.status(201).json();
    }

    public read = async (req: Request, res:Response): Promise<Response> => {
        return res.status(200).json(await this.taskService.read());
    };
};