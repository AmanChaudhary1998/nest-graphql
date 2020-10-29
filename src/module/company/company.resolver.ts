import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "../user/user.service";

import { CompanyService } from "./company.service";
import { CompanyInput } from "./input/company.input";
import { CompanyInterface } from "./interface/company.interface";
import { CompanyType } from "./type/company.type";

@Resolver()
export class CompanyResolver {
    constructor(private readonly CompanyService:CompanyService, private readonly userService: UserService) {}

    @Query(()=>String)
    async hello(){
        return 'hello';
    }

    @Query(()=>[CompanyType])
    async Employee() : Promise<CompanyInterface[]> {
        return await this.CompanyService.find()
    }

    @Mutation(()=> CompanyType)
    async create(@Args('input') input: CompanyInput){
        const data = await this.CompanyService.create(input, {
            path: 'users'
        });
        if (input.users.length) {
            await this.userService.updateMany({ _id: { $in: input.users } }, { $set: { company: data._id } })
        }
        console.log(data);
        return data
    }
}