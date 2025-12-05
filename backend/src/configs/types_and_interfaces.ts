import mongoose, { ObjectId } from "mongoose"

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


export interface FilesUploadResult_Interface {
  url: string;
  publicId: string;
}

export interface LimitedAccountInfo_Interface {
    _id: ObjectId | string
    userName: string
    profilePicture: string
}

export interface Account_Interface extends LimitedAccountInfo_Interface { // Accounts
    googleId: string
    displayName: string
    email: string
    profilePictureId: string,
    firstName: string
    lastName: string
    tagline: string
    gender: string
    district: string
    state: string
    country: string
    date_of_birth: string
    tags: string[]
    createdAt: Date
}

export interface Complex_Account_Interface extends Account_Interface{
    followers: LimitedAccountInfo_Interface[]
    followings: LimitedAccountInfo_Interface[]
    posts: PostSummarySpecificAccount_Interface[]
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

export interface FandUF_Interface extends Document {
    follower: ObjectId | string
    following: ObjectId | string
    createdAt: Date
}


export interface IndividualLeg_Interface {
    startPhoto: string | null,
    legIntroduction: string | null,
    startDate: string | null,
    legDistance: number | null,
    environment: string | null,
    landscape: string | null,
    weather: string | null,
    location: string | null,
    highlights: string[],
    challenges: string[],
    restaurants: {
        availability: string | null,
        recommendation: string | null
    },
    fuelAndServices: {
        availability: string | null,
        recommendation: string | null
    },
    stays: {
        availability: string | null,
        recommendation: string | null
    },
    network: {
        availability: string | null,
        recommendation: string | null
    },
    conclusion: string | null,
    startTime: string | null,
    endTime: string | null,
    difficulty: string | null,
    expenses: number | null,
    traffic: string | null,
    roadConditions: string | null
    endPhoto: File | string | null,
    notes: string | null
    photoDump: string[] | null 
}



export interface Posts_Interface extends Document {
    account: LimitedAccountInfo_Interface
    thumbnail: string | null
    expeditionName: string | null
    date: string | null,
    introduction: string | null,
    days: number | null
    totalDistance: number | null
    expenses: number | null
    amenities: string | null
    season: string | null
    environment: string | null
    transport: string | null
    landscape: string | null
    difficulty: string | null
    locationString: string | null
    footfall: string | null
    dangers: string | null
    description: string | null
    domainString: string | null
    embedding: number[]
    legs: IndividualLeg_Interface[]
    createdAt: Date
}

export interface PostsSummary_Interface extends Document {
    account: LimitedAccountInfo_Interface
    thumbnail: string | null
    expeditionName: string | null
    date: string | null,
    introduction: string | null,
    days: number | null
    totalDistance: number | null
    expenses: number | null
    amenities: string | null
    season: string | null
    environment: string | null
    transport: string | null
    landscape: string | null
    difficulty: string | null
    locationString: string | null
    footfall: string | null
    dangers: string | null
    description: string | null
    domainString: string | null
}

export interface PostSummarySpecificAccount_Interface extends Document {
    thumbnail: string | null
    domainString: string | null
}

export interface Sitrep_Interface {
    _id?: ObjectId
    sitrepImage:{
        url: string,
        public_id: string
    }
    description: string | null
    createdAt?: Date
    account?: LimitedAccountInfo_Interface
    viewers?: LimitedAccountInfo_Interface[]
}
