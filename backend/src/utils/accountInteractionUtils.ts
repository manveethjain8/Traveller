import { ObjectId } from "mongoose";
import FandUF from "../models/FandUF";
import { Error_Interface, FandUF_Interface } from "../configs/types_and_interfaces";

export const fetchRelationship = async(following: string | ObjectId, follower: string | ObjectId):Promise<Partial<FandUF_Interface> | Error_Interface | null>  => {
    try{
        const response = await FandUF.findOne({follower, following})
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching relationship', error: err.message, location: 'Account Interactions Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Account Interactions Utils'}
        }
    }
}