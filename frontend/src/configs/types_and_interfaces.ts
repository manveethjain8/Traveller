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
        location: string | undefined,
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
        location: string | undefined
        footfall: string | undefined
        healthRisks: string | undefined
        description: string | undefined
    },
    postPreview: {
        thumbnail: string | undefined
    }
}

