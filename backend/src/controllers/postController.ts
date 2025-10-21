import { Request, Response } from "express"
import { FilesUploadResult_Interface} from "../configs/types_and_interfaces"
import Post from "../models/posts"
import { uploadMultipleFiles, uploadSingleFile } from "../utils/cloudinaryUploadUtils"

export const uploadPost = async(req: Request, res: Response): Promise<void> => {
    try{
        const filesArray = req.files as Express.Multer.File[]
        const body = req.body
        
        const postData: any = {}

        Object.keys(body).forEach(key => {
            if(key !== 'legs'){
                postData[key] = body[key]
            }
        })

        const legs = JSON.parse(body.legs || [])

        for (let index = 0; index < legs.length; index++) {
            if (!legs[index]) legs[index] = {}

            
            const startPhotoFile = filesArray.find(f => f.fieldname === `startPhoto_${index}`)
            const endPhotoFile = filesArray.find(f => f.fieldname === `endPhoto_${index}`)

            if (startPhotoFile) {
                const uploaded = await uploadSingleFile(startPhotoFile.buffer, "posts/legs")
                legs[index].startPhoto = uploaded.url
            }

            if (endPhotoFile) {
                const uploaded = await uploadSingleFile(endPhotoFile.buffer, "posts/legs")
                legs[index].endPhoto = uploaded.url
            }


            const photoDumpFiles = filesArray.filter(f => f.fieldname === `photoDump_${index}`)
            if (photoDumpFiles.length > 0) {
                const buffers = photoDumpFiles.map(f => f.buffer)
                const uploadedArray = await uploadMultipleFiles(buffers, "posts/legs")
                legs[index].photoDump = uploadedArray.map(u => u.url)
            }
        }


        const thumbnailFile = filesArray.find(file => file.fieldname === 'thumbnail')
        if(thumbnailFile){
            const uploadResult: FilesUploadResult_Interface = await uploadSingleFile(thumbnailFile.buffer, 'posts/thumbnails')
            postData.thumbnail = uploadResult.url
        }

        postData.legs = legs

        await Post.create({
            ...postData,
            accountId: (req.user as any).mongoDbId
        })

        res.status(201).json({message: 'Post uploaded successfully'})

    }catch(err){
        if(err instanceof Error){
			res.status(500).json({message: 'Error while uploading the post', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while uploading the post'})
		}
    }
}