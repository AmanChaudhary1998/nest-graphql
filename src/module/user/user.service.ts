import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserType } from './type/user.type';


import { UserInput } from './input/User.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserInterface } from './interface/user.interface';
import { ModelName } from '../helper/enum';
import { mutateId } from '../helper/helper';

@Injectable()
export class UserService {
  constructor(@InjectModel(ModelName.USER) private UserModel: Model<UserInterface>) {}


  async create(creatUserInput: UserInput): Promise<UserInterface> {
    creatUserInput.password = await bcrypt.hash(creatUserInput.password,12);
    const createdUser = new this.UserModel(creatUserInput);
    return await createdUser.save();
  }

  async createwebtoken(id): Promise<String>{
    return jwt.sign(String(id),'secret');
  }

  async find(): Promise<UserInterface[]> {
    return await this.UserModel.find();
  }

  
  async findOne(query): Promise<UserInterface>{
    return await this.UserModel.findOne(query).lean();
  }
  
}