import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ModelName } from "../helper/enum";
import { CompanyInterface } from "./interface/company.interface";

@Injectable()
export class CompanyService {
    constructor(@InjectModel(ModelName.COMPANY) private CompanyModel: Model<CompanyInterface>) {}

    async create(data, populate?): Promise<CompanyInterface> {
        return await this.CompanyModel.create(data).then((doc) => {
            if (populate) {
                return doc.populate(populate).execPopulate()
            }
            return doc;
        });
    }

    async findOne(query,populate?):Promise<CompanyInterface>{
        const result = await this.CompanyModel.findOne(query);
        console.log(result);
        return result.populate(populate);
    }

    async find(populate?): Promise<CompanyInterface[]> {
        return await this.CompanyModel.find().populate(populate)
    }

    async update(query,update,populate?):Promise<CompanyInterface>{
        return await this.CompanyModel.findOneAndUpdate(query,update,{ new: true }).populate(populate)
    }


}