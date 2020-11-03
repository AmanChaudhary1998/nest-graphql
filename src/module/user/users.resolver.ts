import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { AuthGuard } from './guard/auth.guard';
import { UserType } from './type/user.type';
import { UserInput } from './input/User.input';
import { UserService } from './user.service';
import { UserInterface } from './interface/user.interface';
import { comparePass, mutateId } from '../helper/helper';
import { actionMessages } from '../action-message/action-message';

@Resolver()
export class UserResolver {
  constructor(private readonly UserService: UserService) {}

  @Query(() => [UserType])
  async Users(): Promise<UserInterface[]> {
    const result = await this.UserService.find({path:'company'});
    const user = mutateId(result);
    console.log(user)
    return user.map(({ id, name, email, company }) => {
      return {
        id,
        name,
        email,
        company
      };
    });
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: UserInput) {
    const created =  await this.UserService.create(input,{path:'company'});
    const result = mutateId(created);
    return result;
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
    return await this.UserService.token(String(_id));
  }
}
