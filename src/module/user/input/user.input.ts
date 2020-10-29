import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UserInput
{
    @Field()
    readonly name: string;
    @Field()
    readonly email: string;
    @Field()
     password: string;
     @Field()
     company: string
}