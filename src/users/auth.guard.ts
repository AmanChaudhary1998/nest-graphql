import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
          }
          ctx.user = this.validateToken(ctx.headers.authorization);
          return true;
    }

    async validateToken(auth: string): Promise<any> {
        if (auth.split(' ')[0] !== 'Bearer') {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        try {
          const secret = 'secret';
          return await jwt.verify(token, secret);
        } catch (err) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}