import dotenv from 'dotenv'
import { ENV } from "./types_and_interfaces";

dotenv.config()

export const configurations: ENV = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: parseInt(process.env.PORT || '5000')
}