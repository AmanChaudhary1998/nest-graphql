import { ApolloError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const mutateId = result => {
    const res = JSON.stringify(result).replace(/_id/g, 'id');
    return JSON.parse(res);
}

export const comparePass = (oldPassword,newPassword)=>{
    const compare = bcrypt.compareSync(oldPassword,newPassword);
    return compare;
    
}

export const verify = (id)=>{
    const verified = jwt.sign(String(id),'secret');
    return verified;
}