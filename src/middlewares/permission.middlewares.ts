import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";

export class permissionMiddleware {
    public isAdminOrOwnerUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const userTokenId = Number(res.locals.decoded.sub);
        const userId = Number(req.params.UserId);

        const userToken = await prisma.user.findFirst({
            where: { id: userTokenId }, 
        });

        if (!userToken) {
            throw new AppError("Token owner not found.", 403);
        }

        if (userToken.admin || userId === userTokenId) {
            return next()
        }

        throw new AppError("Insuffient permission.", 403);
    }
}