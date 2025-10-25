import { Request, Response } from "express"
import { Error_Interface } from "../configs/types_and_interfaces"
import { handleFandUF } from "../utils/accountInteractionUtils"

export const handleFollowingAndUnfollowing = async(req: Request, res: Response): Promise<any> => {
    try{
        const {toBeFollowedId, follwerId} = req.body
        const response: Error_Interface = await handleFandUF(toBeFollowedId, follwerId)

        if(!response || 'error' in response){
			res.status(500).json({message: 'Failed to handle relationship', location: 'account interactions controller [Backend]'})
		}

        res.status(200).json({message: 'Successfully handled relationship'})

    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({message: 'Error while retriving account details', error: err.message})
        }else{
            res.status(500).json({message: 'Unknown Error while retriving account details'})
        }
    }
}