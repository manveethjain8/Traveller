import { ObjectId } from "mongoose";
import FandUF from "../models/FandUF";
import { Error_Interface } from "../configs/types_and_interfaces";

export const handleFandUF = async(toBeFollowedId: string | ObjectId, followerId: string | ObjectId):Promise<any | Error_Interface>  => {
    try{
        const relationship = {followerId, toBeFollowedId}
        await FandUF.create(relationship)
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error handling relationship', error: err.message, location: 'Account Interactions Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Account Interactions Utils'}
        }
    }
}