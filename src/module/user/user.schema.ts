//import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';


export  const UserSchema = new Schema({
  name: {type : String},
  email: {type : String},
  password: {type : String}

})

// export const UserSchema = SchemaFactory.createForClass(User);



// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class User extends Document {
//   @Prop()
//   name: string;

//   @Prop()
//   email: string;

//   @Prop()
//   password: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
