import jwt from 'jsonwebtoken'
import { Account_Interface, Error_Interface, TokenPayload_Interface } from '../configs/types_and_interfaces'
import { configurations } from '../configs/connections'
import { ObjectId } from 'mongoose'
import Account from '../models/accounts'


// Generates JWT Access Token
export const generateAccessToken = (payload: TokenPayload_Interface): string => {
    return jwt.sign(payload, configurations.ACCESS_TOKEN_SECRET, {expiresIn: '1min'})
}


// Generates JWT Refresh Token
export const generateRefreshToken = (payload: TokenPayload_Interface): string => {
    return jwt.sign(payload, configurations.REFRESH_TOKEN_SECRET, {expiresIn: '30min'})
}

// Verifies JWT Access Token
export const verifyAccessToken = (payload: string): TokenPayload_Interface => {
    return jwt.verify(payload, configurations.ACCESS_TOKEN_SECRET) as TokenPayload_Interface
}

// Verifies JWT Refresh Token
export const verifyRefreshToken = (payload: string): TokenPayload_Interface => {
    return jwt.verify(payload, configurations.REFRESH_TOKEN_SECRET) as TokenPayload_Interface
}

export const findAccount = async(mongoDbId: ObjectId | string): Promise<Account_Interface | Error_Interface | null> => {
    try{
        const response = await Account.findOne<Account_Interface | null>({_id: mongoDbId}, 'firstName lastName profilePicture userName tagline gender district state country date_of_birth profilePictureId')
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return { message: 'Error retriving account', error: err.message, location: 'Accounts Utils'}
        }else{
            return { message: 'Unknown error has occured while retriving the account', error: err, location: 'Accounts Utils'}
        }
    }
}