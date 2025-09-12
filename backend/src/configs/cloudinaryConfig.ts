import { v2 as cloudinary } from "cloudinary"
import { configurations } from "./connections";

cloudinary.config({
  cloud_name: configurations.CLOUDINARY_CLOUD_NAME,
  api_key: configurations.CLOUDINARY_API_KEY,
  api_secret: configurations.CLOUDINARY_API_SECRET,
});

export default cloudinary