import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';

import { AuthGuard } from './auth.guard';
import { UserType } from './type/user.type';
import { UserInput } from './input/User.input';
import { UserService } from './user.service';
import { UserInterface } from './interface/user.interface';

@Resolver()
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [UserType])
  async Users(): Promise<UserInterface[]> {
    const result = await this.UserService.find();
    console.log(result);
    const data = JSON.stringify(result).replace(/_id/g, 'id');
    const users = JSON.parse(data);
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
  @UseGuards(new AuthGuard())
  async me(@Context('user') user: UserInterface): Promise<UserInterface> {
    return await user;
  }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') p: string,
  ): Promise<String> {
    const user = await this.UserService.findOne({email}); 
    const { password,_id } = user;
    const pass = user.password;
    const check = bcrypt.compareSync(p, pass);
    if (!check) {
      throw new ApolloError('Password Incorrect');
    }
    return await this.UserService.createwebtoken(_id);
  }
}
