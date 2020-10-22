import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field(()=> ID)
     id: string;
    @Field()
    readonly name: string;
    @Field()
    readonly email: string;
  }