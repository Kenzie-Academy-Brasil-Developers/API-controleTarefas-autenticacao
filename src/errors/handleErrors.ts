import { NextFunction, Request, Response } from "express"
import { AppError } from "./appError"
import { AnyZodObject, ZodError } from "zod";

export class GlobalError {
    public handleErros = (error: Error, req: Request, res: Response, next: NextFunction): Response => {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message });
        }
        if (error instanceof ZodError){
            return res.status(400).json({ message: error.errors });
        }
        console.log(error);

        return res.status(500).json({ message: "Internal Server Erros"});
    };

    static validBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction): void => {
        req.body = schema.parse(req.body);
        return next();
    };
};
