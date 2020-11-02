import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { UserInput } from './input/User.input';
import { UserInterface } from './interface/user.interface';
import { ModelName } from '../helper/enum';


@Injectable()
export class UserService {
  constructor(@InjectModel(ModelName.USER) private UserModel: Model<UserInterface>) {}


  async create(creatUserInput: UserInput): Promise<UserInterface> {
    creatUserInput.password = await bcrypt.hash(creatUserInput.password,12);
    const createdUser = new this.UserModel(creatUserInput);
    const result =  await createdUser.populate('company').execPopulate()
      return result.save();
    
  }

  async createwebtoken(id): Promise<String>{
    return jwt.sign(String(id),'secret');
  }

  async find(populate?): Promise<UserInterface[]> {
    const result= await this.UserModel.find().populate(populate);
    //console.log(result);
    return result;
  }

  
  async findOne(query): Promise<UserInterface>{
    return await this.UserModel.findOne(query).lean();
  }
    
  async updateMany(query, update): Promise<UserInterface>{
    return await this.UserModel.updateMany(query, update);
  }


  // async updateUser(query)
  
  // async delete(id,input) {
  //   const value= await this.UserModel.deleteOne({_id: {$in : input.users.id}})
  //   console.log(value);
  //   return value;
  // }

}