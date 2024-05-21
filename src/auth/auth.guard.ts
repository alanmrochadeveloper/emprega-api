import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    try {
      const jwt = request.cookies["jwt"];
      return this.jwtService.verify(jwt);
    } catch (e) {
      if (e.name === "JsonWebTokenError") {
        throw new UnauthorizedException(
          "Você precisa estar logado para acessar esse recurso!"
        );
      }
      if (e.name === "TokenExpiredError") {
        response.clearCookie("jwt");
        throw new UnauthorizedException(
          "Token expirado, por favor faça login novamente. Ou atualize a página (F5)."
        );
      }
      return false;
    }
  }
}
