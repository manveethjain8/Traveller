import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type {UserInfo_Type } from "../configs/types_and_interfaces";
import { userInfo_Template } from "../configs/templates";
import {customAPI} from "../api/customAPI";

interface ProfileContext_Interface {
    // Profile Posts Category
    profileCategory: string
    setProfileCategory: Dispatch<SetStateAction<string>> 
    // Profile Posts Category

    // Edit Profile
    editProfileClicked: boolean
    setEditProfileClicked: Dispatch<SetStateAction<boolean>>
    updating: boolean
    setUpdating: Dispatch<SetStateAction<boolean>>
    userInfo: Partial<UserInfo_Type>
    setUserInfo: Dispatch<SetStateAction<Partial<UserInfo_Type>>>
    ppPreview: string | null
    setppPreview: Dispatch<SetStateAction<string | null>>
    handleInputChange: <K extends keyof UserInfo_Type>(field: K, value: UserInfo_Type[K]) => void
    handleSaveChanges: () => void
    getAccountDetails: (accountId?: string) => void
    handleTagToggle: (tag: string) => void
    // Edit Profile
}

const ProfileContext = createContext<ProfileContext_Interface | undefined>(undefined)

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileContextProvider: FC<ProfileProviderProps> = ({children}) => {

    // Profile Posts Category
    const [profileCategory, setProfileCategory] = useState<string>('public')
    // Profile Posts Category

    // Edit Profile
    const [editProfileClicked, setEditProfileClicked] = useState<boolean>(false)
    const [updating, setUpdating] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<Partial<UserInfo_Type>>(userInfo_Template)
    const [ppPreview, setppPreview] = useState<string | null>(null)

    const handleInputChange = <K extends keyof UserInfo_Type>(field: K, value: UserInfo_Type[K]): void => {
        if(field === 'profilePicture' && value instanceof File){
            setppPreview(URL.createObjectURL(value))
            setUserInfo(prev => ({
                ...prev,
                [field]: value
            }))
        }else(
            setUserInfo(prev => ({
                ...prev,
                [field]: value
            }))
        )
    }

    const handleTagToggle = (tag: string) => {
        setUserInfo(prev => {
            const currentTags = prev.tags || []
            const newTags = currentTags.includes(tag)
            ? currentTags.filter(t => t !== tag)
            : [...currentTags, tag]
            return { ...prev, tags: newTags }
        })
    }

    const getAccountDetails = async(accountId?: string): Promise<void> => {
        try{
            const reqAccountId = accountId ? accountId : undefined
            const endPoint = `/account/fetch-account-details/${reqAccountId}`
            const response = await customAPI.get<UserInfo_Type>(endPoint, {withCredentials: true})
            setUserInfo(response.data)
            sessionStorage.setItem('searchedAccountId', response.data._id)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving account details. Location: profileContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving account details. Location: profileContext[Frontend]', err)
            }
        }
    }

    const handleSaveChanges = async(): Promise<void> => {
        try{
            setUpdating(true)
            const formData = new FormData();

            (Object.keys(userInfo) as (keyof UserInfo_Type)[]).forEach((key) => {
                const value = userInfo[key]

                if (value instanceof File){
                    formData.append(key, value)
                }else if (typeof value === 'string'){
                    formData.append(key, value)
                }else if (Array.isArray(value)) {
                    value.forEach(item => formData.append(key, item as any))
                }
            })

            await customAPI.patch('/account/update-user-account', formData, { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            getAccountDetails()
            setUpdating(false)
            setEditProfileClicked(false)
        }catch(err){
            if(err instanceof Error){
                console.log('Error updating user details. Location: profileContext[Frontend]', err)
            }else{
                console.log("Unknown error has occured while updating user details. Location: profileContext[Frontend]", err)
            }
        }
    }
    // Edit Profile

    return(
        <ProfileContext.Provider value = {
            {
                profileCategory, setProfileCategory,
                editProfileClicked, setEditProfileClicked,
                updating, setUpdating,
                userInfo, setUserInfo,
                ppPreview, setppPreview,
                handleInputChange, handleSaveChanges, getAccountDetails, handleTagToggle
            }
        }>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileContextProvider")
    }
    return context
}