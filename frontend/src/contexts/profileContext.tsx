import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

interface ProfileContext_Interface {
    // Profile Posts Category
    postsCategory: string,
    setPostCategory: Dispatch<SetStateAction<string>> 
    // Profile Posts Category
}

const ProfileContext = createContext<ProfileContext_Interface | undefined>(undefined)

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileContextProvider: FC<ProfileProviderProps> = ({children}) => {

    // Profile Posts Category
    const [postsCategory, setPostCategory] = useState<string>('public')
    // Profile Posts Category

    return(
        <ProfileContext.Provider value = {
            {
                postsCategory, setPostCategory
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