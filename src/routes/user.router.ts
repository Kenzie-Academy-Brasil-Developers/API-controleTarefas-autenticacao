import { Router } from "express";
// import { auth, ensure, permission } from "../middlewares"
import { UserController } from "../controllers/UserController";
import { authMiddleware, ensureMiddleware } from "../middlewares";
import { sessionCreateSchema, userCreateSchema } from "../schemas";

export const userRouter = Router();

export const userController = new UserController();

userRouter.post(
    "",
    ensureMiddleware.bodyIsValid(userCreateSchema),
    ensureMiddleware.emailIsUnique,
    userController.create
);

userRouter.post(
    "/login",
    ensureMiddleware.bodyIsValid(sessionCreateSchema),
    userController.login
);

userRouter.get(
    "/profile",
    authMiddleware.validateToken,
    userController.profile
);


