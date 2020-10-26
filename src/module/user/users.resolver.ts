import { UseGuards } from "@nestjs/common";
import { Resolver,Query, Args, Mutation, Context } from "@nestjs/graphql";
import { AuthGuard } from "./auth.guard";
import { UserType } from "./dto/create-User.dto";

import { UserInput } from "./input/User.input";
import * as bcrypt from 'bcrypt';
import { User } from "./user.schema";
import { UserService } from "./user.service";
import { ApolloError } from "apollo-server-express";
import { UserInterface } from "./interface/user.interface";

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
  async login(@Args('email') email : string,
              @Args('password') p:string): Promise<String>{
    const user = await this.UserService.getUserByEmail(email);
    const {password,_id} = user
    //console.log(password,_id);
    const pass = user.password;
    const check = bcrypt.compareSync(p,pass)
      //console.log(check);
      if(!check){
       throw new ApolloError("Password Incorrect");
      }
      // if(err)
      // {
      //   throw err;
      // }else if(!isMatch){
      //   throw new ApolloError("Password Incorrect");
      // }
      return await this.UserService.createwebtoken(_id);
    }
}