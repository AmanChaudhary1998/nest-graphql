import { UseGuards } from "@nestjs/common";
import { Resolver,Query, Args, Mutation, Context } from "@nestjs/graphql";
import { AuthGuard } from "./auth.guard";
import { UserType } from "./dto/create-User.dto";
import { UserInput } from "./input/User.input";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(
      private readonly UserService : UserService
  ) {}

  @Query(()=> String)
  async hello() {
    return 'hello';
  }

  @Query(()=> [UserType])
  async Users(){
      return await this.UserService.findAll()
  }

  @Mutation(()=> UserType)
  async createUser(@Args('input')  input : UserInput) {
    return await this.UserService.create(input);
  }

  @Query(()=>UserType)
  @UseGuards(new AuthGuard())
  async me(@Context('user') user:User){
    return await user;
  }

  @Mutation(()=>String)
  async login(@Args('email') email : string){
    let user = await this.UserService.getUserByEmail(email);
    return this.UserService.createwebtoken(user);
  }

}