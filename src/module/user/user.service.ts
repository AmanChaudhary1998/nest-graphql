import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserType } from './dto/create-User.dto';


import { UserInput } from './input/User.input';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserInterface } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserInterface>) {}


  async create(creatUserInput: UserInput): Promise<User> {
    creatUserInput.password = await bcrypt.hash(creatUserInput.password,12);
    const createdUser = new this.UserModel(creatUserInput);
    return await createdUser.save();
  }

  async createwebtoken(id): Promise<String>{
   const j =  jwt.sign({id},'secret');
   //console.log(j);
   return j;
  }

  async findAll(): Promise<User[]> {
    const user = await this.UserModel.find();
    user.forEach(function (v) {delete v.password});
    return user;
  }

  async getUserByEmail(email: string): Promise<UserInterface>{
    return await this.UserModel.findOne({email:email}).lean();
  }
  
}