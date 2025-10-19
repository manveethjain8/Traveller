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

export type IndividualLeg_type = {
    id: string,
    name: string,
    legData: {
        startPhoto: File | string | undefined,
        legIntroduction: string,
        startDate: string,
        legDistance: number | undefined,
        environment: string,
        landscape: string,
        weather: string,
        location: string,
        highlights: string[],
        challenges: string[],
        endPhoto: File | string | undefined,
        photoDump: File[] | string[] | undefined 
    },
    legPreview: {
        startPhoto: File | string | undefined,
        endPhoto: File | string | undefined,
        photoDump: File[] | string[] | undefined
    }
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
    legs: IndividualLeg_type[]
}

