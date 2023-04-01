import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.req.headers.authorization) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const authorizationToken = ctx.req.headers.authorization.split(' ')[1];

    if (authorizationToken) {
      const user = jwt.verify(authorizationToken, process.env.SECRET_KEY);
      ctx.user = user;
      return true;
    } else {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
