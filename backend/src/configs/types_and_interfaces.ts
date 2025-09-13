import { ObjectId } from "mongoose"

export interface ENV_Interface {                  // Environmental Variables
    MONGO_URI: string
    PORT: number
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    SESSION_SECRET: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
}

export interface Error_Interface { // Error
    message: string; 
    error: unknown; 
    location: string 
}

export interface Account_Interface extends Document { // Accounts
    _id: ObjectId | string
    googleId: string
    displayName: string
    email: string
    profilePicture: string,
    profilePictureId: string,
    firstName: string
    lastName: string
    userName: string
    tagline: string
    gender: string
    district: string
    state: string
    country: string
    date_of_birth: string
}

export interface AuthenticatedRequestInterface extends Request{ // Google Authenticated Account Structure
    user: {
        _id: ObjectId | string,
        googleId: string,
        displayName: string
    }
}

export interface Quotes_Interface { // Quotes
    author: string,
    quote: string
}

export interface TokenPayload_Interface {
    mongoDbId: ObjectId | string
    googleId: string
}
