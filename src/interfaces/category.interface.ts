import { z } from "zod";
import { categoryCreateSchema } from "../schemas/category.schema";

type CategoryCreate = z.infer<typeof categoryCreateSchema>;
type CategoryReturn = z.infer<typeof categoryCreateSchema>;

export { CategoryCreate, CategoryReturn };
