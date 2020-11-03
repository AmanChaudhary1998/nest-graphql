import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";

import { mutateId } from "../helper/helper";
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
    async company() : Promise<CompanyInterface[]> {
        const value= await this.CompanyService.find({path:'users'})
        const result = mutateId(value);
        console.log(result);
        return result;
    }

    @Mutation(()=> CompanyType)
    async createCompany(@Args('input') input: CompanyInput){
        const data = await this.CompanyService.create(input, {
            path: 'users'
        });
        if (input.users.length) {
            await this.userService.updateMany({ _id: { $in: input.users } }, { $set: { company: data._id } })
        }
        console.log(data);
        return data
    }

    @Mutation(()=>CompanyType)
    async findOne(@Args('id') id: String){
        const result =  await this.CompanyService.findOne({_id: id});
        const check = await mutateId(result);
        return(check);
    }

    @Mutation(()=> CompanyType)
    async addUser(@Args('companyId') companyId: String,
            @Args('userId') userId:String){
                const check=await this.CompanyService.update({_id: companyId },{$addToSet: {users: userId}},{path:'users'})
                const updated = mutateId(check);
                return updated;
    }

    @Mutation(()=> CompanyType)
    async removeUser(@Args('companyId') companyId: String,
                @Args('userId') userId:String){
                    const success = await this.CompanyService.update({_id :companyId}, {$pull : {users: userId}},{path:'users'})
                    const removed = mutateId(success);
                    console.log(removed);
                    return removed;
    }
}