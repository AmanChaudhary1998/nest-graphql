import { Schema } from 'mongoose';
import { ModelName } from 'src/module/helper/enum';


export  const UserSchema = new Schema({
  name: {type : String},
  email: {type : String},
  company:{
    type:Schema.Types.ObjectId,
    ref: ModelName.COMPANY
  },
  password: {type : String}

});

