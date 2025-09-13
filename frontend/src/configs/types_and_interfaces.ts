export type Quotes_Type = { // Quotes
    author: string,
    quote: string
}

export type UserInfo_Type = { // User Information
    _id: string
    profilePicture: File | string | undefined
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

