import dotenv from 'dotenv'
import { ENV_Interface } from "./types_and_interfaces";

dotenv.config() // Enables Environmental Variables

export const configurations: ENV_Interface = {                     // Common variable for all env's, as is makes it easy to use them
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: parseInt(process.env.PORT || '5000'),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    SESSION_SECRET: process.env.SESSION_SECRET || '',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || ''
}