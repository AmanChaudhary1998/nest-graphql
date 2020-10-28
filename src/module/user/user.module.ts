import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserResolver } from './users.resolver';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { ModelName } from '../helper/enum';

@Module({
    imports:[MongooseModule.forFeature([{ name: ModelName.USER, schema: UserSchema }])],
  providers: [UserResolver,UserService],
})
export class UserModule {}
