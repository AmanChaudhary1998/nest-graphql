import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';

export const mutateId = result => {
    const res = JSON.stringify(result).replace(/_id/g, 'id');
    return JSON.parse(res);
}

export const comparePass = (oldPassword,newPassword)=>{
    const compare = bcrypt.compareSync(oldPassword,newPassword);
    return compare;
    
}