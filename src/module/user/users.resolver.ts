import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { ApolloError } from 'apollo-server-express';


import { AuthGuard } from './auth.guard';
import { UserType } from './type/user.type';
import { UserInput } from './input/User.input';
import { UserService } from './user.service';
import { UserInterface } from './interface/user.interface';
import { comparePass, mutateId } from '../helper/helper';
import { actionMessages } from '../errors/actionMessage';

@Resolver()
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

  // @Query(() => String)
  // async hello() {
  //   return 'hello';
  // }

  @Query(() => [UserType])
  async Users(): Promise<UserInterface[]> {
    const result = await this.UserService.find();
    const users = mutateId(result);
    return users.map(({ id, name, email }) => {
      return {
        id,
        name,
        email,
      };
    });
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    return await this.UserService.create(input);
  }

  @Query(() => UserType)
  @UseGuards(AuthGuard)
  async me(@Context() context) {
    const { user } = context.req;
    const userData = await this.UserService.findOne({ _id: user })
    return mutateId(userData)
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') p: string,
  ): Promise<String> {
    const user = await this.UserService.findOne({email}); 
    const { password, _id } = user;
    const pass = user.password;
    const check = comparePass(p,pass);
    if (!check) {
      throw actionMessages.error.passwordNotMatch;
    }
    return await this.UserService.createwebtoken(String(_id));
  }
}
