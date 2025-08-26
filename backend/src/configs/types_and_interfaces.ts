export interface ENV_Interface {
    MONGO_URI: string
    PORT: number
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    SESSION_SECRET: string,
}

export interface Account_Interface extends Document {
    googleId: string
    displayName: string
    email: string
}

export interface AuthenticatedRequestInterface extends Request{
    account: {
        _id: string,
        googleId: string,
        displayName: string
    }
}
