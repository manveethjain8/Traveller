import type { AddPost_Type, AddSitrep_Type, IndividualLeg_type, UserInfo_Type } from "./types_and_interfaces";

export const userInfo_Template: Partial<UserInfo_Type> = {
    profilePicture: undefined,
    firstName: undefined,
    lastName: undefined,
    userName: undefined,
    district: undefined,
    gender: undefined,
    tagline: undefined,
    state: undefined,
    country: undefined,
    date_of_birth: undefined
}

export const addPost_Template: AddPost_Type['postData'] = {
    thumbnail: undefined,
    expeditionName: undefined,
    date: undefined,
    introduction: undefined,
    days: undefined,
    totalDistance: undefined,
    expenses: undefined,
    amenities: undefined,
    season: undefined,
    environment: undefined,
    transport: undefined,
    landscape: undefined,
    difficulty: undefined,
    locationString: undefined,
    footfall: undefined,
    healthRisks: undefined,
    description: undefined,
}

export const addPostPreview_Template: AddPost_Type['postPreview'] = {
    thumbnail: undefined
}

export const individualLeg_Template: IndividualLeg_type['legData'] = {
    startPhoto: undefined,
    legIntroduction: undefined,
    startDate: undefined,
    legDistance: undefined,
    environment: undefined,
    landscape: undefined,
    weather: undefined,
    locationString: undefined,
    highlights: [''],
    challenges: [''],
    endPhoto: undefined,
    photoDump: undefined,
    restaurants: {
            availability: undefined,
            recommendation: undefined
    },
    fuelAndServices: {
        availability: undefined,
        recommendation: undefined
    },
    stays: {
        availability: undefined,
        recommendation: undefined
    },
    network: {
        availability: undefined,
        recommendation: undefined
    },
    conclusion: undefined,
    startTime: undefined,
    endTime: undefined,
    roadConditions: undefined,
    difficulty: undefined,
    expenses: undefined,
    traffic: undefined,
    notes: undefined
}

export const legPreview_Template: IndividualLeg_type['legPreview'] = {
    startPhoto: undefined,
    endPhoto: undefined,
    photoDump: undefined
}

export const sitrep_template: AddSitrep_Type = {
    sitrepData: {
        images: undefined,
        description: undefined
    },
    sitrepPreview:{
        images: undefined
    }
}