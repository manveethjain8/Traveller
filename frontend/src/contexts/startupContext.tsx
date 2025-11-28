import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { LimitedAccountInfo_Type } from "../configs/types_and_interfaces";
import customAPI from "../api/customAPI";

interface StartupContext_Interface {
    limitedUserInfo: LimitedAccountInfo_Type | undefined
    setLimitedUserInfo: Dispatch<SetStateAction<LimitedAccountInfo_Type | undefined>>

    activeAccountId: string
    setActiveAccountId: Dispatch<SetStateAction<string>>

    // Sidebar Category
    sideBarCategory: string | undefined,
    setSideBarCategory: Dispatch<SetStateAction<string | undefined>> 
    setNavigationCategorytoLocalStorage: (category: string) => void
    // Sidebar Category

    logoutFunction: () => Promise<void>
}

const StartupContext = createContext<StartupContext_Interface | undefined>(undefined)

interface StartupProviderProps {
    children: ReactNode
}

export const StartupContextProvider: FC<StartupProviderProps> = ({children}) => {

    const [limitedUserInfo, setLimitedUserInfo] = useState<LimitedAccountInfo_Type | undefined>(undefined)

    const [activeAccountId, setActiveAccountId] = useState<string>('')

    // Sidebar Category
    const [sideBarCategory, setSideBarCategory] = useState<string | undefined>('home')
    // Sidebar Category

    const setNavigationCategorytoLocalStorage = (category: string): void => {
        localStorage.setItem('sidebarCategory', category)
    }

    useEffect(() => {
        const value: string  = localStorage.getItem('sidebarCategory') ||  'home'
        if(value){
            setSideBarCategory(value)
        }
    }, [])


    const getLimitedAccountInfo = async(): Promise<void> => {
        try{
            const result = await customAPI.get<LimitedAccountInfo_Type>('/account/fetch-limited-account-details', {withCredentials: true})
            if(result.data._id !== undefined){
                setLimitedUserInfo(result.data)
                setActiveAccountId(result.data._id)
            }
            
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving account details. Location: profileContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving account details. Location: profileContext[Frontend]', err)
            }
        }
    }

    const logoutFunction = async(): Promise<void> => {
        try{
            const res = await customAPI.get<string>('/auth/logout')
            if(res.data === 'success'){
                window.location.href = '/'
                setNavigationCategorytoLocalStorage('home')
                setSideBarCategory('home')
            }
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getLimitedAccountInfo()
    }, [])

    return (
        <StartupContext.Provider value={
            {
                limitedUserInfo, setLimitedUserInfo,
                activeAccountId, setActiveAccountId,
                sideBarCategory, setSideBarCategory,
                setNavigationCategorytoLocalStorage, logoutFunction
            }
        }>
            {children}
        </StartupContext.Provider>
    )
}

export const useStartupContext = () => {
    const context = useContext(StartupContext)
    if(!context){
        throw new Error("useStartupContext must be used within a StartupContextProvider")
    }
    return context
}