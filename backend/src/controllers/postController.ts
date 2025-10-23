import { Request, Response } from "express"
import { Error_Interface, FilesUploadResult_Interface, Posts_Interface, PostSummarySpecificAccount_Interface} from "../configs/types_and_interfaces"
import Post from "../models/posts"
import { uploadMultipleFiles, uploadSingleFile } from "../utils/cloudinaryUploadUtils"
import { fetchAllPosts, fetchAllPostsOfSpecificAccount } from "../utils/postUtils"
import { ObjectId } from "mongoose"

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


        let legs = body.legsWithoutFiles
        if (typeof legs === 'string') {
            try {
                legs = JSON.parse(legs)
            } catch {
                legs = []
            }
        }

        for (let index = 0; index < legs.length; index++) {
            console.log(`Processing leg ${index}`) 
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


        try {
            const newPost = await Post.create({
                ...postData,
                accountId: (req.user as any).mongoDbId
            })
        } catch (err) {
            console.error("🔥 Error during Post.create():", err)
        }

        res.status(201).json({message: 'Post uploaded successfully'})

    }catch(err){
        if(err instanceof Error){
			res.status(500).json({message: 'Error while uploading the post', error: err.message})
		}else{
			res.status(500).json({message: 'Unknown Error while uploading the post'})
		}
    }
}

export const getAllPosts = async(req: Request, res: Response): Promise<void> => {
    try{
        const recentPosts: Posts_Interface[] | Error_Interface = await fetchAllPosts()

        if(!recentPosts || 'error' in recentPosts){
			res.status(500).json({message: 'Failed to fetch recent posts', location: 'posts controller [Backend]'})
		}

        res.status(200).json(recentPosts)

    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({message: 'Error while retriving posts', error: err.message})
        }else{
            res.status(500).json({message: 'Unknown Error while retriving posts'})
        }
    }
}

export const getAllPostsOfSpecificAccount = async(req: Request, res: Response): Promise<void> => {
    try{
        const accountId: string | ObjectId = (req.user as any).mongoDbId
        const allPosts: PostSummarySpecificAccount_Interface[] | Error_Interface = await fetchAllPostsOfSpecificAccount(accountId)

        if(!allPosts || 'error' in allPosts){
			res.status(500).json({message: 'Failed to fetch recent posts', location: 'posts controller [Backend]'})
		}

        res.status(200).json(allPosts)

    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({message: "Error while retriving the post of the account", error: err.message})
        }else{
            res.status(500).json({message: "Unknown Error while retriving the post of the account"})
        }
    }
}