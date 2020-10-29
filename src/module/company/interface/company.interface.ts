import { Document, Schema } from "mongoose";

export interface CompanyInterface extends Document{
    name:string;
    user: [Schema.Types.ObjectId];
    email:string;
} 