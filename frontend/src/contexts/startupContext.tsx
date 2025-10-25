import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { LimitedAccountInfo_Type } from "../configs/types_and_interfaces";
import customAPI from "../api/customAPI";
import { useDisplayPostContext } from "./displayPostContext";

interface StartupContext_Interface {
    limitedUserInfo: LimitedAccountInfo_Type | undefined
    setLimitedUserInfo: Dispatch<SetStateAction<LimitedAccountInfo_Type | undefined>>

    activeAccountId: string | undefined
    setActiveAccountId: Dispatch<SetStateAction<string | undefined>>
}

const StartupContext = createContext<StartupContext_Interface | undefined>(undefined)

interface StartupProviderProps {
    children: ReactNode
}

export const StartupContextProvider: FC<StartupProviderProps> = ({children}) => {

    const {getAllPosts} = useDisplayPostContext()

    const [limitedUserInfo, setLimitedUserInfo] = useState<LimitedAccountInfo_Type | undefined>(undefined)

    const [activeAccountId, setActiveAccountId] = useState<string | undefined>(undefined)

    const getLimitedAccountInfo = async(): Promise<void> => {
        try{
            const result = await customAPI.get<LimitedAccountInfo_Type>('/account/fetch-limited-account-details', {withCredentials: true})
            setLimitedUserInfo(result.data)
            setActiveAccountId(result.data._id)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving account details. Location: profileContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving account details. Location: profileContext[Frontend]', err)
            }
        }
    }

    useEffect(() => {
        getLimitedAccountInfo()
        getAllPosts()
    }, [])

    return (
        <StartupContext.Provider value={
            {
                limitedUserInfo, setLimitedUserInfo,
                activeAccountId, setActiveAccountId
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