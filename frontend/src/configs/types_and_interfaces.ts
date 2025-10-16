export type Quotes_Type = { // Quotes
    author: string,
    quote: string
}

export type LimitedAccountInfo_Type = { // Limited User Information
    _id: string
    userName: string
    profilePicture: string
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
    tags: string[]
}

export type AddPost_Type = {
    thumbnail: File | string | undefined
    expeditionName: string
    date: string,
    introduction: string,
    days: number | undefined
    totalDistance: number | undefined
    expenses: number | undefined
    amenities: string
    season: string
    environment: string
    transport: string
    landscape: string
    difficulty: string
    location: string
    footfall: string
    healthRisks: string
    description: string
}

