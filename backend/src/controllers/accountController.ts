import { Request, Response } from "express"
import { deleteFromCloudinary, uploadSingleFile} from "../utils/cloudinaryUploadUtils";
import Account from "../models/accounts";
import { Account_Interface, Complex_Account_Interface, Error_Interface, FilesUploadResult_Interface, LimitedAccountInfo_Interface} from "../configs/types_and_interfaces";
import { findAccount, findAccountForInternal, returnLimitedAccountInfo, returnMultipleLimitedAccountInfo } from "../utils/accountUtils";
import { ObjectId } from "mongoose";


export const updateUserInfo = async(req: Request, res: Response) => {
	try{
		const textData: Partial<Account_Interface> = req.body
		const fileData: Express.Multer.File | undefined = req.file

		const updatedFields: Partial<Account_Interface> = {
			...textData
		}

		if(fileData){
			const mongoDbId: ObjectId | string = (req.user as any).mongoDbId
			const account: Account_Interface | null | Error_Interface= await findAccountForInternal(mongoDbId)

			if (account && "profilePictureId" in account) {
				try {
					await deleteFromCloudinary(account.profilePictureId);
				} catch(err) {
					console.error("Failed to delete old Cloudinary image:", err);
				}
			}

			const uploadResult: FilesUploadResult_Interface = await uploadSingleFile(fileData.buffer, 'profile_pictures')
	
			updatedFields.profilePicture = uploadResult.url
			updatedFields.profilePictureId = uploadResult.publicId
		}


		const filteredUpdatedFields = Object.fromEntries(Object.entries(updatedFields).filter(([_, v]) => v !== ''))


		const account = await Account.findByIdAndUpdate(
			(req.user as any).mongoDbId,
			filteredUpdatedFields,
			{new : true}
		)

		if(!account){
			res.status(500).json({message: 'Failed to find the account to be updated', location: 'accounts controller [Backend]'})
		}
		res.status(200).json({message: 'Account updated successfully'})
	}catch(err: unknown){
		if(err instanceof Error){
			res.status(500).json({message: 'Error while updating account details', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while updating account details'})
		}
	}
}

export const getAccountInfo = async(req: Request, res: Response): Promise<any> => {
	try{
		const mongoDbId: ObjectId | string = (req.user as any).mongoDbId
		const account: Partial<Complex_Account_Interface> | Error_Interface | null = await findAccount(mongoDbId)

		if(!account || 'error' in account){
			res.status(500).json({message: 'Failed to find the account', location: 'accounts controller [Backend]'})
		}


		res.status(200).json(account)
	}catch(err: unknown){
		if(err instanceof Error){
			res.status(500).json({message: 'Error while retriving account details', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while retriving account details'})
		}
	}
}

export const getLimitedAccountInfo = async(req: Request, res: Response): Promise<any> => {
	try{
		const mongoDbId: ObjectId | string = (req.user as any).mongoDbId
		const account: LimitedAccountInfo_Interface| Error_Interface | null = await returnLimitedAccountInfo(mongoDbId)

		if(!account || 'error' in account){
			res.status(500).json({message: 'Failed to find the account', location: 'accounts controller [Backend]'})
		}


		res.status(200).json(account)
	}catch(err: unknown){
		if(err instanceof Error){
			res.status(500).json({message: 'Error while retriving account details', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while retriving account details'})
		}
	}
}

export const searchAccountByName = async(req: Request, res: Response): Promise<any> => {
	try{
		const {accountSearchText: searchText} = req.params

		const regex = new RegExp(searchText, "i")

		const response: LimitedAccountInfo_Interface[] | Error_Interface | null = await returnMultipleLimitedAccountInfo(regex)

		if(!response || 'error' in response){
			res.status(500).json({message: 'Failed to find the accounts', location: 'accounts controller [Backend]'})
		}


		res.status(200).json(response)
	}catch(err: unknown){
		if(err instanceof Error){
			res.status(500).json({message: 'Error while retriving matching accounts', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while retriving matching accounts'})
		}
	}
}


 