import { compare, hash } from "bcryptjs";
import { prisma } from "../database/prisma";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { SessionCreate, SessionReturn, UserCreate, UserReturn} from "../interfaces";
import { userReturnSchema } from "../schemas";

export class UserService {
    public create = async (payload: UserCreate): Promise<UserReturn> => {
        payload.password = await hash(payload.password, 10);
        const newUser = await prisma.user.create({ data: payload });
        
        return userReturnSchema.parse(newUser);
    }
    
    public login = async ({
        email,
        password,
    }: SessionCreate): Promise<SessionReturn> => {
        const foundUser = await prisma.user.findFirst({ where: { email} });
        
        if (!foundUser) {
            throw new AppError("User not exists", 404);
        }
        
        const samePassword = await compare(password, foundUser.password);
        
        if (!samePassword) {
            throw new AppError("Email and password doesn't match", 401);
        }
        
        const token: string = sign({}, process.env.JWT_SECRET!, {
            subject: foundUser.id.toString(),
            expiresIn: "1h",
        });
        
        return {
            accessToken: token,
            user: userReturnSchema.parse(foundUser),
        };
    };
    
    public profile = async (userId: number): Promise<UserReturn> => {
        const foundUser = await prisma.user.findFirst({ where: { id: userId } });
        
        if (!foundUser) {
            throw new AppError("User not found", 404);
        }
        return userReturnSchema.parse(foundUser);
    };
}

