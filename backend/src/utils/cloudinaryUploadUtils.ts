import multer from "multer"
import {type UploadApiResponse, type UploadApiErrorResponse} from 'cloudinary'
import cloudinary from "../configs/cloudinaryConfig";
import streamifier from 'streamifier'
import { FilesUploadResult_Interface } from "../configs/types_and_interfaces";




export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
    fieldSize: 10 * 1024 * 1024 // 10 MB for text fields
  }
})

export const uploadSingleFile = async (buffer: Buffer, folder: string): Promise<FilesUploadResult_Interface> => {
    return uploadToCloudinary(buffer, folder)
}

export const uploadMultipleFiles = async(buffers: Buffer[], folder: string): Promise<FilesUploadResult_Interface[]> => {
    const uploadPromises = buffers.map((buf) => uploadToCloudinary(buf, folder))
    return Promise.all(uploadPromises)
}

export const uploadToCloudinary = async(buffer: Buffer, folder: string): Promise<FilesUploadResult_Interface> => {
    return new Promise<FilesUploadResult_Interface>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({folder}, (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (err){
                return reject(err)
            }
            if (!result){
                return reject(new Error("Cloudinary Upload Failed"))
            }
            const uploadResult: FilesUploadResult_Interface = {
                url: result.secure_url,
                publicId: result.public_id,
            }
            resolve(uploadResult)
        })

        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
}

export const deleteFromCloudinary = async(publicId: string):Promise<void> => {
   await cloudinary.uploader.destroy(publicId);
}