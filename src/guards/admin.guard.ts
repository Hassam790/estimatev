import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.currentUser; // Assuming currentUser is set by a previous guard or interceptor
        if (!user) {
            return false; // No user found, deny access
        }
        return user.admin; // Allow access only if the user is an admin
    }
}