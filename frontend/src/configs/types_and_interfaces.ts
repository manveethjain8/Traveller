export type Quotes_Type = { // Quotes
    author: string,
    quote: string
}

export type LimitedAccountInfo_Type = { // Limited User Information
    _id: string
    userName: string
    profilePicture: string
    district?: string
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
        endPhoto: File | string | undefined,
        legDescription: string | undefined,
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
        tags: string | undefined,
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
        dangers: string | undefined
        description: string | undefined
    },
    postPreview: {
        thumbnail: string | undefined
    }
}

export interface IndividualLeg_Interface {
    _id: string,
    startPhoto: string | null,
    legDescription: string | null,
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
    tags: string | null,
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
    legs: IndividualLeg_Interface[]
    createdAt: Date
    interactions: Interactions_Interface
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
    tags: string | null,
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
    interactions: Interactions_Interface
}

export interface SemanticPostsSummary_Interface extends Document {
    _id: string
    account: LimitedAccountInfo_Type
    thumbnail: string | null
    expeditionName: string | null
    date: string | null,
    tags: string | null,
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

export interface PostInteractions_Interface { 
    postId: string,
    likes: number,
    comments: {
        accountId: string,
        commentId: string,
        comment: string,
        createdAt: Date
    }[]
}

export interface Comment_Interface {
  _id: string;
  account: LimitedAccountInfo_Type;
  comment: string;
  createdAt: string;
}

export interface Interactions_Interface {
    likes: string[]; // account IDs
    comments: Comment_Interface[];
}

export interface Coordinates {
    place: string,
    latitude: number,
    longitude: number
}

export interface PlaceInfo {
    name: string
    description: string
    summary: string

    coordinates: {
        lat?: number | null
        lon?: number | null
    }

    facts: {
        country?: string | null
        state?: string | null
        population?: number | null
    }
}

export interface PlaceImage { 
    url: string
    width?: number | null
    height?: number | null
    description?: string | null
    source?: string // default: "Unsplash"
}


  

export type WeatherResponse = {
    coordinates: {
        lon: number
        lat: number
    }

    weather: {
        id: number
        main: string
        description: string
        icon: string
    }[]

    base: string

    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level?: number | null
        grd_level?: number | null
    }

    visibility: number

    wind: {
        speed: number
        deg?: number | null
        gust?: number | null
    }

    rain?: {
        one_h: number
    } | null

    clouds: {
        all: number
    }

    date: string   // ISO datetime string from FastAPI

    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }

    timezone: number
    id: number
    name: string
    cod: number | string
}

export interface ForecastList {
    dt: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        sea_level?: number
        grd_level?: number
        temp_kf?: number
    }

    weather: {
        id: number
        main: string
        description: string
        icon: string
    }[]

    clouds: {
        all: number
    }

    wind: {
        speed: number
        deg: number
        gust?: number
    }

    visibility: number
    pop?: number

    rain?: {
        "3h"?: number
    }

    sys: {
        pod: "d" | "n"
    }

    dt_txt: string
}

export type ForecastResponse = {
    cod: string | number
    message: number
    cnt: number

    list: ForecastList[]

    city: {
        id: number
        name: string

        coord: {
            lat: number
            lon: number
        }

        country?: string;
        population: number
        timezone: number
        sunrise: number
        sunset: number
    }
}


export interface AdditionalInformationType{
    text: PlaceInfo
    images: PlaceImage[]
    weather: WeatherResponse
    forecast: ForecastResponse
} 
    