import { Document, Schema } from "mongoose";

export interface UserInterface extends Document{
    name: string;
    email:string;
    password:string;
    company: Schema.Types.ObjectId;
}