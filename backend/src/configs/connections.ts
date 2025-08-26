import dotenv from 'dotenv'
import { ENV_Interface } from "./types_and_interfaces";

dotenv.config()

export const configurations: ENV_Interface = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: parseInt(process.env.PORT || '5000'),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    SESSION_SECRET: process.env.SESSION_SECRET || '',
}