import { ExecutionContext, UnauthorizedException, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AirlinesGuard extends AuthGuard("airlines") {
  // Переопределение метода canActivate для активации проверки токена
  canActivate(context: ExecutionContext) {
    return super.canActivate(context); 
  }
  handleRequest(err, user, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const requiredRole = "ADMIN"; 
    if (user.role !== requiredRole) {
      throw new UnauthorizedException("You do not have the required role");
    }

    return user;
  }
}