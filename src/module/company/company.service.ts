import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ModelName } from "../helper/enum";
import { CompanyInput } from "./input/company.input";
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

    async find(): Promise<CompanyInterface[]> {
        return await this.CompanyModel.find()
    }
}