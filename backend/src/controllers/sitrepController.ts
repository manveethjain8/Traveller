import { Request, Response } from "express"
import { Error_Interface, FilesUploadResult_Interface, Sitrep_Interface } from "../configs/types_and_interfaces"
import { uploadMultipleFiles, uploadSingleFile} from "../utils/cloudinaryUtils"
import Sitrep from "../models/sitreps"
import { fetchSitreps } from "../utils/sitrepUtils"

export const uploadSitrep = async(req: Request, res: Response): Promise<void> =>{
    try{
        const filesArray = req.files as Express.Multer.File[]
        const body = req.body
        
        const sitreps = JSON.parse(body.metadata)

        for(let index = 0; index < sitreps.length; index++){
            const sitrep: Sitrep_Interface = {
                sitrepImage: { url: "", public_id: "" },
                description: ""
            } 
            const sitrepFile = filesArray.find(f => f.fieldname === `file_${index}`)

            if(sitrepFile){
                const uploaded = await uploadSingleFile(sitrepFile.buffer, "sitreps")
                sitrep.sitrepImage.url= uploaded.url ?? ''
                sitrep.sitrepImage.public_id = uploaded.publicId ?? ''

            }
            sitrep.description = sitreps[index].description ?? ''

            try {
                await Sitrep.create({
                    ...sitrep,
                    account: (req.user as any).mongoDbId
                })
            } catch (err) {
                console.error("🔥 Error during sitrep.create():", err)
            }
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