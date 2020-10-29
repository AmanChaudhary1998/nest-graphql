import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "src/module/user/type/user.type";

@ObjectType()
export class CompanyType {
    @Field(()=> ID)
     id: string;
    @Field(()=>String)
    readonly name:string 
    @Field(() => [UserType], { nullable: true })
    readonly users: [UserType];
    @Field(() => String)
    readonly email: string;
  }