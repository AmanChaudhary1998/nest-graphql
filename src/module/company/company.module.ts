import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ModelName } from "../helper/enum";
import { UserSchema } from "../user/schema/user.schema";
import { UserService } from "../user/user.service";
import { CompanyResolver } from "./company.resolver";
import { CompanyService } from "./company.service";
import { CompanySchema } from "./schema/company.schema";

@Module({
    imports:[MongooseModule.forFeature([{name : ModelName.COMPANY,schema: CompanySchema}, { name: ModelName.USER, schema: UserSchema }])],
    providers:[CompanyResolver,CompanyService, UserService],
})
export class CompanyModule {}