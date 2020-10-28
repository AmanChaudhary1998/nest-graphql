import { Schema } from 'mongoose';


export  const UserSchema = new Schema({
  name: {type : String},
  email: {type : String},
  password: {type : String}

});

