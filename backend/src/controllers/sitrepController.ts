import { Request, Response } from "express"
import { FilesUploadResult_Interface } from "../configs/types_and_interfaces"
import { uploadMultipleFiles, uploadSingleFile } from "../utils/cloudinaryUploadUtils"
import Sitrep from "../models/sitreps"

export const uploadSitrep = async(req: Request, res: Response): Promise<void> =>{
    try{
        const filesArray = req.files as Express.Multer.File[]
        const body = req.body
        
         const postData: Record<string, any> = {
            description: body?.description,
        }

        let sitrepImages: string[] = []

        if(filesArray && filesArray.length > 0){
            const buffers = filesArray.map((f) => f.buffer).filter((b): b is Buffer => b != undefined)

            const uploadedArray: FilesUploadResult_Interface[] = await uploadMultipleFiles(buffers, "sitreps")
            sitrepImages = uploadedArray.map((u) => u.url)
        }

        postData.sitrepImages = sitrepImages


        try {
            await Sitrep.create({
                ...postData,
                account: (req.user as any).mongoDbId
            })
        } catch (err) {
            console.error("🔥 Error during sitrep.create():", err)
        }

        res.status(201).json({message: 'sitrep uploaded successfully'})

    }catch(err){
        if(err instanceof Error){
			res.status(500).json({message: 'Error while uploading the sitrep', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while uploading the sitrep'})
		}
    }
}