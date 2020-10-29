import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CompanyInput
{
    @Field(() => String)
    readonly name: string;

    @Field(() => [String])
    readonly users:[string];

    @Field(() => String)
    readonly email: string;


}