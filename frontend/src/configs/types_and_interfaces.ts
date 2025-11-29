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
    firstName: string | undefined
    lastName: string | undefined
    userName: string | undefined
    tagline: string | undefined
    gender: string | undefined
    district: string | undefined
    state: string | undefined
    country: string | undefined
    date_of_birth: string | undefined
    tags: string[] | undefined
    followers: LimitedAccountInfo_Type[] | undefined
    followings: LimitedAccountInfo_Type[] | undefined
    posts: PostSummarySpecificAccount_Type[] | undefined
}

export type IndividualLeg_type = {
    id: string,
    name: string,
    legData: {
        startPhoto: File | string | undefined,
        legIntroduction: string | undefined,
        startDate: string | undefined,
        legDistance: number | undefined,
        environment: string | undefined,
        landscape: string | undefined,
        weather: string | undefined,
        locationString: string | undefined,
        highlights: string[],
        challenges: string[],
        restaurants: {
            availability: string | undefined,
            recommendation: string | undefined
        },
        fuelAndServices: {
            availability: string | undefined,
            recommendation: string | undefined
        },
        stays: {
            availability: string | undefined,
            recommendation: string | undefined
        },
        network: {
            availability: string | undefined,
            recommendation: string | undefined
        },
        conclusion: string | undefined,
        startTime: string | undefined,
        endTime: string | undefined,
        difficulty: string | undefined,
        expenses: number | undefined,
        traffic: string | undefined,
        roadConditions: string | undefined,
        endPhoto: File | string | undefined,
        notes: string | undefined,
        photoDump: File[] | string[] | undefined 
    },
    legPreview: {
        startPhoto:  string | undefined,
        endPhoto:  string | undefined,
        photoDump:  string[] | undefined
    }
}

export type AddPost_Type = {
    postData: {
        thumbnail: File | string | undefined
        expeditionName: string | undefined
        date: string | undefined,
        introduction: string | undefined,
        days: number | undefined
        totalDistance: number | undefined
        expenses: number | undefined
        amenities: string | undefined
        season: string | undefined
        environment: string | undefined
        transport: string | undefined
        landscape: string | undefined
        difficulty: string | undefined
        locationString: string | undefined
        footfall: string | undefined
        healthRisks: string | undefined
        description: string | undefined
    },
    postPreview: {
        thumbnail: string | undefined
    }
}

export interface IndividualLeg_Interface {
    _id: string,
    startPhoto: string | null,
    legIntroduction: string | null,
    startDate: string | null,
    legDistance: number | null,
    environment: string | null,
    landscape: string | null,
    weather: string | null,
    locationString: string | null,
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


export interface Posts_Interface {
    _id: string
    account: LimitedAccountInfo_Type
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
    healthRisks: string | null
    description: string | null
    domainString: string | null
    legs: IndividualLeg_Interface[]
    createdAt: Date
}

export type PostSummarySpecificAccount_Type = {
    _id: string
    thumbnail: string | null
    domainString: string | null
}

export type PostsSummary_Type = {
    _id: string
    account: LimitedAccountInfo_Type
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
    healthRisks: string | null
    description: string | null
    domainString: string | null
}

export type AddSitrep_Type = {
    id: number
    sitrepData: {
        image: File | string | undefined,
        description: string | undefined
    },
    sitrepPreview: {
        image: string | undefined
    }
}

export interface Sitrep_Interface {
    _id: string
    sitrepImage:{
        url: string,
        public_id: string
    }
    description: string | null
    createdAt: Date
    account: LimitedAccountInfo_Type
    viewers: LimitedAccountInfo_Type[]
}