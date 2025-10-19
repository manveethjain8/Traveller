import type { AddPost_Type, IndividualLeg_type, UserInfo_Type } from "./types_and_interfaces";

export const userInfo_Template: Partial<UserInfo_Type> = {
    profilePicture: undefined,
    firstName: '',
    lastName: '',
    userName: '',
    district: '',
    gender: '',
    tagline: '',
    state: '',
    country: '',
    date_of_birth: ''
}

export const addPost_Template: AddPost_Type['postData'] = {
    thumbnail: undefined,
    expeditionName: '',
    date: '',
    introduction: '',
    days: undefined,
    totalDistance: undefined,
    expenses: undefined,
    amenities: '',
    season: '',
    environment: '',
    transport: '',
    landscape: '',
    difficulty: '',
    location: '',
    footfall: '',
    healthRisks: '',
    description: '',
    legs: []
}

export const addPostPreview_Template: AddPost_Type['postPreview'] = {
    thumbnail: undefined
}

export const individualLeg_Template: IndividualLeg_type['legData'] = {
    startPhoto: undefined,
    legIntroduction: '',
    startDate: '',
    legDistance: undefined,
    environment: '',
    landscape: '',
    weather: '',
    location: '',
    highlights: [''],
    challenges: [''],
    endPhoto: undefined,
    photoDump: undefined
}

export const legPreview_Template: IndividualLeg_type['legPreview'] = {
    startPhoto: undefined,
    endPhoto: undefined,
    photoDump: undefined
}