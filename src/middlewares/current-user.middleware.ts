import { NestMiddleware } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}
   async   use(req: any, res: any, next: () => void) {
        const {userId} = req.session || {};
        if(userId) {
            req.currentUser = await this.usersService.findOne(userId)
        }
        next();
     }
}