import { Error_Interface, Sitrep_Interface } from "../configs/types_and_interfaces"
import Sitrep from "../models/sitreps"

export const fetchSitreps = async():Promise<Sitrep_Interface[] | Error_Interface>  => {
    try{
        const response = await Sitrep.find({}, '_id sitrepImages[url] description account viewers').populate("account viewers", "_id profilePicture userName").sort({createdAt: -1}).lean<Sitrep_Interface[]>()
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching sitreps', error: err.message, location: 'sitrep Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'sitrep Utils'}
        }
    }
}