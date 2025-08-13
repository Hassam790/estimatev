import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
            session?:{
                userId?:number
            } // Define the type of currentUser as needed
        }
    }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}
   async   use(req: Request, res: any, next: () => void) {
        const {userId} = req?.session || {};
        if(userId) {
            req.currentUser = await this.usersService.findOne(userId)
        }
        next();
     }
}