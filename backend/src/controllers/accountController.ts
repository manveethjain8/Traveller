import { Request, Response } from "express"
import { uploadToCloudinary } from "../utils/cloudinarySingleFileUtils";
import Account from "../models/accounts";
import { Account_Interface} from "../configs/types_and_interfaces";


export const updateUserInfo = async(req: Request, res: Response) => {
	try{
		
		const textData: Partial<Account_Interface> = req.body
		const fileData: Express.Multer.File | undefined = req.file

		const updatedFields: Partial<Account_Interface> = {
			...textData
		}

		if(fileData){
			const uploadResult = await uploadToCloudinary(fileData.buffer)
			
			updatedFields.profilePicture = uploadResult.path
			updatedFields.profilePictureId = uploadResult.filename
		}


		const account = await Account.findByIdAndUpdate(
			(req.user as any)?._id,
			updatedFields,
			{new : true}
		)

		if(!account){
			res.status(500).json({message: 'Failed to find the account to be updated', location: 'accounts controller [Backend]'})
		}
		res.status(200)
	}catch(err: unknown){
		if(err instanceof Error){
			res.status(500).json({message: 'Error while updating account details', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while updating account details'})
		}
	}
}