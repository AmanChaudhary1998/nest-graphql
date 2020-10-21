import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserType } from './dto/create-User.dto';


import { UserInput } from './inputs/User.input';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}


  async create(creatUserInput: UserInput): Promise<User> {
    creatUserInput.password = await bcrypt.hash(creatUserInput.password,12);
    const createdUser = new this.UserModel(creatUserInput);
    return await createdUser.save();
  }

  async createwebtoken({id,name, email}: User){
   return jwt.sign({id,name,email },'secret');
  }

  async findAll(): Promise<User[]> {
    const user = await this.UserModel.find();
    user.forEach(function (v) {delete v.password});
    console.log(user);
    return user;
  }

  async getUserByEmail(email: string){
    return await this.UserModel.findOne({email});
  }
  
}