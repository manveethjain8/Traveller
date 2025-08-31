import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { UserInfo_Type } from "../configs/types_and_interfaces";
import { userInfo_Template } from "../configs/templates";
import customAPI from "../api/customAPI";

interface ProfileContext_Interface {
    // Profile Posts Category
    postsCategory: string
    setPostCategory: Dispatch<SetStateAction<string>> 
    // Profile Posts Category

    // Edit Profile
    editProfileClicked: boolean
    setEditProfileClicked: Dispatch<SetStateAction<boolean>>
    userInfo: UserInfo_Type
    setUserInfo: Dispatch<SetStateAction<UserInfo_Type>>
    ppPreview: string | null
    setppPreview: Dispatch<SetStateAction<string | null>>
    handleInputChange: <K extends keyof UserInfo_Type>(field: K, value: UserInfo_Type[K]) => void
    handleSaveChanges: () => void
    // Edit Profile
}

const ProfileContext = createContext<ProfileContext_Interface | undefined>(undefined)

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileContextProvider: FC<ProfileProviderProps> = ({children}) => {

    // Profile Posts Category
    const [postsCategory, setPostCategory] = useState<string>('public')
    // Profile Posts Category

    // Edit Profile
    const [editProfileClicked, setEditProfileClicked] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfo_Type>(userInfo_Template)
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

    const handleSaveChanges = async(): Promise<void> => {
        try{
            const formData = new FormData();

            (Object.keys(userInfo) as (keyof UserInfo_Type)[]).forEach((key) => {
                const value = userInfo[key]

                if (value instanceof File){
                    formData.append(key, value)
                }else if (typeof value === 'string'){
                    formData.append(key, value)
                }
            })

            await customAPI.put('/account/update-user-details', formData,{
                withCredentials: true,
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
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
                postsCategory, setPostCategory,

                editProfileClicked, setEditProfileClicked,
                userInfo, setUserInfo,
                ppPreview, setppPreview,
                handleInputChange, handleSaveChanges
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