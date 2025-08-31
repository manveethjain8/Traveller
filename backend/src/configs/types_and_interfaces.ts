export interface ENV_Interface {                  // Environmental Variables
    MONGO_URI: string
    PORT: number
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    SESSION_SECRET: string
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
}

export interface Error_Interface { // Error
    message: string; 
    error: unknown; 
    location: string 
}

export interface Account_Interface extends Document { // Accounts
    googleId: string
    displayName: string
    email: string
    profilePicture: string,
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
    account: {
        _id: string,
        googleId: string,
        displayName: string
    }
}

export interface Quotes_Interface { // Quotes
    author: string,
    quote: string
}