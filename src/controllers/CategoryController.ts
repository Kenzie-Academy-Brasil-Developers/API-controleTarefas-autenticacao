import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryServices";

export class CategoryController {
    private categoryService = new CategoryService();
    
    public createCategory = async (req: Request, res: Response): Promise<Response> => {
        const newCategory = await this.categoryService.create(req.body);
        return res.status(201).json(newCategory);
    };
    
    public deleteCategory = async (req: Request, res: Response): Promise<Response> => {
        await this.categoryService.delete(Number(req.params.categoryId));
        return res.status(200).json();
    };
    
 
};