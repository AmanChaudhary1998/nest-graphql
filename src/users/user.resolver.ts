import { Resolver,Query, Args, Mutation } from "@nestjs/graphql";
import { UserType } from "./dto/create-User.dto";
import { UserInput } from "./inputs/User.input";
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
      return this.UserService.findAll()
  }

  @Mutation(()=> UserType)
  async createUser(@Args('input')  input : UserInput) {
    return this.UserService.create(input);
  }

}