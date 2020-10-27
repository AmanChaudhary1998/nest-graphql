import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserType } from './type/user.type';


import { UserInput } from './input/User.input';
import { UserSchema } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserInterface } from './interface/user.interface';
import { ModelName } from '../helper/enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(ModelName.USER) private UserModel: Model<UserInterface>) {}


  async create(creatUserInput: UserInput): Promise<UserInterface> {
    creatUserInput.password = await bcrypt.hash(creatUserInput.password,12);
    const createdUser = new this.UserModel(creatUserInput);
    return await createdUser.save();
  }

  async createwebtoken({id}): Promise<String>{
    return jwt.sign({id},'secret');
  }

  async find(): Promise<UserInterface[]> {
    return await this.UserModel.find();
  }

  // async specifydata({_id,name,email}):Promise<UserInterface[]> {
  //   return await this.UserModel.find({_id:id,name:name,email:email}).lean()
  // }

  async findOne(query): Promise<UserInterface>{
    return await this.UserModel.findOne(query).lean();
  }
  
}