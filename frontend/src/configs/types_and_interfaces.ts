export type Quotes_Type = { // Quotes
    author: string,
    quote: string
}

export interface UserInfo_Type { // User Information
    profilePicture: File | undefined
    firstName: string
    lastName: string
    userName: string
    tagline: string
    gender: string,
    district: string
    state: string
    country: string
    date_of_birth: string
}