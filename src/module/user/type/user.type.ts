import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CompanyType } from "src/module/company/type/company.type";

@ObjectType()
export class UserType {
    @Field(()=> ID)
     id: string;
    @Field(() => String)
    readonly name: string;
    @Field(() => String)
    readonly email: string;
    @Field(()=> CompanyType, {nullable:true})
    readonly company: CompanyType
  }