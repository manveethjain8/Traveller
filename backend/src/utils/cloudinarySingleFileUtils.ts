import multer from "multer"
import {type UploadApiResponse, type UploadApiErrorResponse} from 'cloudinary'
import cloudinary from "../configs/cloudinaryConfig";
import streamifier from 'streamifier'

export const upload = multer({storage: multer.memoryStorage()})

export const uploadToCloudinary = async(buffer: Buffer, folder = 'profile_pictures'): Promise<UploadApiResponse> => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({folder}, (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (err){
                return reject(err)
            }
            if (!result){
                return reject(new Error("Cloudinary Upload Failed"))
            }
            resolve(result)
        })

        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
}

export const deleteFromCloudinary = async(publicId: string):Promise<void> => {
   await cloudinary.uploader.destroy(publicId);
}