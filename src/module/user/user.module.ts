import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './users.resolver';
import { User,UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
    imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserResolver,UserService],
})
export class UserModule {}
