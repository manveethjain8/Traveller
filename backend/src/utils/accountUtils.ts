import jwt from 'jsonwebtoken'
import { Account_Interface, Complex_Account_Interface, Error_Interface, LimitedAccountInfo_Interface, TokenPayload_Interface } from '../configs/types_and_interfaces'
import { configurations } from '../configs/connections'
import { ObjectId } from 'mongoose'
import Account from '../models/accounts'
import FandUF from '../models/FandUF'


// Generates JWT Access Token
export const generateAccessToken = (payload: TokenPayload_Interface): string => {
    return jwt.sign(payload, configurations.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
}


// Generates JWT Refresh Token
export const generateRefreshToken = (payload: TokenPayload_Interface): string => {
    return jwt.sign(payload, configurations.REFRESH_TOKEN_SECRET, {expiresIn: '24h'})
}

// Verifies JWT Access Token
export const verifyAccessToken = (payload: string): TokenPayload_Interface => {
    return jwt.verify(payload, configurations.ACCESS_TOKEN_SECRET) as TokenPayload_Interface
}

// Verifies JWT Refresh Token
export const verifyRefreshToken = (payload: string): TokenPayload_Interface => {
    return jwt.verify(payload, configurations.REFRESH_TOKEN_SECRET) as TokenPayload_Interface
}

export const findAccount = async(mongoDbId: ObjectId | string): Promise<Complex_Account_Interface | Error_Interface | null> => {
    try{
        const firstResponse = await Account.findOne<Account_Interface | null>({_id: mongoDbId}, 'firstName lastName profilePicture userName tagline gender district state country date_of_birth profilePictureId tags').lean()

        if (!firstResponse) return null

        const followers = await FandUF.find({following: mongoDbId}).populate<{follower: LimitedAccountInfo_Interface}>("follower", "_id userName profilePicture").select("follower -_id").lean()
        const followings = await FandUF.find({follower: mongoDbId}).populate<{following: LimitedAccountInfo_Interface}>("following", "_id userName profilePicture").select("following -_id").lean()

        const followersData: LimitedAccountInfo_Interface[] = followers.map(f => ({
            _id: f.follower._id,
            userName: f.follower.userName,
            profilePicture: f.follower.profilePicture || ""
        }));

        const followingsData: LimitedAccountInfo_Interface[] = followings.map(f => ({
            _id: f.following._id,
            userName: f.following.userName,
            profilePicture: f.following.profilePicture || ""
        }));


        const response = {
            ...firstResponse,
            followers: followersData,
            followings: followingsData
        }

        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return { message: 'Error retriving account', error: err.message, location: 'Accounts Utils'}
        }else{
            return { message: 'Unknown error has occured while retriving the account', error: err, location: 'Accounts Utils'}
        }
    }
}

export const findAccountForInternal = async(mongoDbId: ObjectId | string): Promise<Account_Interface| Error_Interface | null> => {
    try{
        const response = await Account.findOne<Account_Interface | null>({_id: mongoDbId}, 'firstName lastName profilePicture userName tagline gender district state country date_of_birth profilePictureId tags')
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return { message: 'Error retriving account', error: err.message, location: 'Accounts Utils'}
        }else{
            return { message: 'Unknown error has occured while retriving the account', error: err, location: 'Accounts Utils'}
        }
    }
}

export const returnLimitedAccountInfo = async(mongoDbId: ObjectId | string): Promise<LimitedAccountInfo_Interface | Error_Interface | null> => {
    try{
        const response = await Account.findOne<LimitedAccountInfo_Interface | null>({_id: mongoDbId}, 'profilePicture userName')
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return { message: 'Error retriving account', error: err.message, location: 'Accounts Utils'}
        }else{
            return { message: 'Unknown error has occured while retriving the account', error: err, location: 'Accounts Utils'}
        }
    }
}

export const returnMultipleLimitedAccountInfo = async(searchText: RegExp): Promise<LimitedAccountInfo_Interface[] | Error_Interface | null> => {
    try{
        const response = await Account.find<LimitedAccountInfo_Interface[] | null>({userName: {$regex: searchText}}, 'profilePicture userName').lean()
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return { message: 'Error retriving accounts', error: err.message, location: 'Accounts Utils'}
        }else{
            return { message: 'Unknown error has occured while retriving the accounts', error: err, location: 'Accounts Utils'}
        }
    }
}