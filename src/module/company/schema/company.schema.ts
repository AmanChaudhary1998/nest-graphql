import { Schema } from "mongoose";
import { ModelName } from "src/module/helper/enum";

export const CompanySchema = new Schema({
    name:{type:String},
    users:[
        {
            type: Schema.Types.ObjectId,
            ref: ModelName.USER
        }
    ],
    email:{type:String},
});