import { Request, Response } from "express";
import { TaskService } from "../services/TaskServices";
// import { string } from "zod";

export class TaskController {
    private taskService: TaskService = new TaskService();

    public create = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
       const newTask = await this.taskService.create(req.body);
       return res. status(201).json(newTask);
    };

    public getTask = async (
        { query }: Request,
        res: Response
    ): Promise<Response> => {
        const category = query.category ? String(query.category) : undefined;
        const allsTask = await this.taskService.get(category);
        return res.status(200).json(allsTask);    
    };

    public retriveTask = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        const { foundTask } = res.locals;
        const task = await this.taskService.retrive(foundTask);
        
        return res.status(200).json(task);
    };

    public updateTask = async (req: Request, res: Response) => {
        const updatedTask = await this.taskService.update(
            req.params.taskId, req.body
        );
        return res.status(200).json(updatedTask);
    };

    public deleteTask = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        await this.taskService.delete(req.params.taskId);
        return res.status(204).json();
    };
};