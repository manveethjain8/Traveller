import multer from "multer"
import {type UploadApiResponse, type UploadApiErrorResponse} from 'cloudinary'
import cloudinary from "../configs/cloudinaryConfig";
import streamifier from 'streamifier'
import { FilesUploadResult_Interface, Sitrep_Interface } from "../configs/types_and_interfaces";
import cron from "node-cron"
import Sitrep from "../models/sitreps";




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

cron.schedule("0 * * * *", async() => {
    console.log("Running Cloudinary clean up job...")

    try{
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const expiredSitreps: Sitrep_Interface[] = await Sitrep.find({createdAt: {$lt: cutoff}})

        for(const sitrep of expiredSitreps){
            for(const img of sitrep.sitrepImages){
                try{
                    await deleteFromCloudinary(img.public_id)
                    console.log(`🗑️ Deleted Cloudinary image: ${img.public_id}`)
                }catch(err){
                    console.error(`⚠️ Error deleting image ${img.public_id}:`, err)
                }
            }

            await Sitrep.deleteOne({_id: sitrep._id})
            console.log(`✅ Deleted Sitrep: ${sitrep._id}`)
        }
        console.log("✨ Cleanup completed successfully.");
    }catch(err){
        console.error("❌ Cleanup job failed:", err)
    }
})