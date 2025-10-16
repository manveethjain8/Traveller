import type { AddPost_Type, UserInfo_Type } from "./types_and_interfaces";

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

export const addPost_Template: AddPost_Type = {
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
    description: ''
}