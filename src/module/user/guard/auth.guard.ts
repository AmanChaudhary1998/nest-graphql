import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        if (!req.headers.authorization) {
            return false;
          }
          const user = await this.validateToken(req.headers.authorization);
          req.user = user;
          return true;
    }

    async validateToken(auth: string): Promise<string | object> {
        if (auth.split(' ')[0] !== 'Bearer') {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        //console.log(token);
        try {
          const secret = 'secret';
          const j = jwt.verify(token, secret);
          return j;
        } catch (err) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}