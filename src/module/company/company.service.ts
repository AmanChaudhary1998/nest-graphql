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

    async findOne(query):Promise<CompanyInterface>{
        const result = await this.CompanyModel.findOne(query);
        console.log(result);
        return result.populate('users').execPopulate();
    }

    async find(populate?): Promise<CompanyInterface[]> {
        return await this.CompanyModel.find().populate(populate)
    }

    async update(query,update):Promise<CompanyInterface>{
        return await this.CompanyModel.findOneAndUpdate(query,update,{ new: true }).populate('users'); // {new : true } is used to update result in doc variables     
    }

    async delete(query,remove):Promise<CompanyInterface>{
        return await this.CompanyModel.findOneAndDelete(query,remove).populate('users')
    }


}