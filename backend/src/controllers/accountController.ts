import { Request, Response } from "express"
import { uploadToCloudinary } from "../utils/cloudinarySingleFileUtils";
import Account from "../models/accounts";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer);
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", err });
  }
};

export const updateUserInfo = async(req: Request, res: Response) => {
    // try{
    //     const textData = req.body;
    //     const fileData = req.file;

    //     const {day, month, year, ...rest} = textData;

    //     const updatedFields = {
    //         ...rest,
    //         birthday : {day,month,year}
    //     }

    //     if(fileData){
    //         updatedFields.profilePicture = fileData.path;
    //     }

    //     const account = await Account.findByIdAndUpdate(
    //         req.user?.mongoDbId,
    //         updatedFields,
    //         {new : true}
    //     );

    //     if(!account){
    //         res.status(404).json({error : 'Account not found'});
    //     }
    //     res.status(200).json(account);
    // }catch(err){
    //     res.status(500).json({error : err.message});
    // }
}