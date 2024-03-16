import { z } from "zod";
import { sessionCreateSchema, userCreateSchema, userReturnSchema } from "../schemas";

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;

export type SessionCreate = z.infer<typeof sessionCreateSchema>;
export type SessionReturn = {
    accessToken: string;
    user: UserReturn;
};
