import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

interface ProfileContext_Interface {
    // Profile Posts Category
    postsCategory: string
    setPostCategory: Dispatch<SetStateAction<string>> 
    // Profile Posts Category

    // Edit Profile
    editProfileClicked: boolean
    setEditProfileClicked: Dispatch<SetStateAction<boolean>>
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
    // Edit Profile

    return(
        <ProfileContext.Provider value = {
            {
                postsCategory, setPostCategory,
                editProfileClicked, setEditProfileClicked
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