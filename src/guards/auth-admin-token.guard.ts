import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { WordleMainError } from 'src/custom-errors/errors/wordle-main.error';
import { TokenPayloadDto } from 'src/global-dto/token-payload.dto';

@Injectable()
export class AuthAdminToken implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new WordleMainError(HttpStatus.BAD_REQUEST, ['Token not found']);
    }
    try {
      const payload: TokenPayloadDto = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET,
        },
      );

      if (payload.isAdmin) {
        request['user'] = payload;
      } else {
        throw new WordleMainError(HttpStatus.FORBIDDEN, [
          'User is not an admin',
        ]);
      }
    } catch (e) {
      throw e;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
