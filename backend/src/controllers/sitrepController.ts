import { Request, Response } from "express"
import { Error_Interface, FilesUploadResult_Interface, Sitrep_Interface } from "../configs/types_and_interfaces"
import { uploadMultipleFiles} from "../utils/cloudinaryUtils"
import Sitrep from "../models/sitreps"
import { fetchSitreps } from "../utils/sitrepUtils"

export const uploadSitrep = async(req: Request, res: Response): Promise<void> =>{
    try{
        const filesArray = req.files as Express.Multer.File[]
        const body = req.body
        
         const postData: Record<string, any> = {
            description: body?.description,
        }

        let sitrepImages: Sitrep_Interface['sitrepImages'] = []

        if(filesArray && filesArray.length > 0){
            const buffers = filesArray.map((f) => f.buffer).filter((b): b is Buffer => b != undefined)

            const uploadedArray: FilesUploadResult_Interface[] = await uploadMultipleFiles(buffers, "sitreps")
            if (uploadedArray.length > 0) {
                sitrepImages = uploadedArray.map((u) => ({
                    url: u.url,
                    public_id: u.publicId,
                }));
            }
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

export const getAllSitreps = async(req: Request, res: Response): Promise<void> => {
    try{
        const response: Sitrep_Interface[] | Error_Interface = await fetchSitreps()

        if(!response || 'error' in response){
			res.status(500).json({message: 'Failed to fetch recent sitreps', location: 'sitreps controller [Backend]'})
		}

        res.status(200).json(response)
    }catch(err){
        if(err instanceof Error){
			res.status(500).json({message: 'Error while uploading the sitrep', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while uploading the sitrep'})
		}
    }
}