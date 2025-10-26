import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import customAPI from "../api/customAPI"
import type { LimitedAccountInfo_Type } from "../configs/types_and_interfaces"

interface Interactions_Interface {
    accountSearchText: string | undefined
    setAccountSearchText: Dispatch<SetStateAction<string | undefined>>
    searchedAccounts: LimitedAccountInfo_Type[] | []
    setSearchedAccounts: Dispatch<SetStateAction<LimitedAccountInfo_Type[] | []>>

    handleRelationship: (toBeFollowedId: string, followerId: string) => Promise<string>
    handleAccountSearch: () => Promise<void>
}

const InteractionContext = createContext<Interactions_Interface | undefined>(undefined)

interface InteractionsProviderProps { 
    children: ReactNode
}

export const InteractionsContextProvider: FC<InteractionsProviderProps> = ({children}) => {

    const [searchedAccounts, setSearchedAccounts] = useState<LimitedAccountInfo_Type[] | []>([])
    const [accountSearchText, setAccountSearchText] = useState<string | undefined>(undefined)

    const handleRelationship = async(toBeFollowedId: string, followerId: string): Promise<string> => {
        try{
            const relationship = {toBeFollowedId, followerId}
            await customAPI.post('/interaction/following-unfollowing', relationship, {withCredentials: true})
            return('success')
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving account details. Location: interaction context[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving account details. Location: interaction context[Frontend]', err)
            }
            return('failure')
        }
    }

    const handleAccountSearch = async(): Promise<void> => {
        try{
            if(accountSearchText !== undefined){
                const response = await customAPI.get<LimitedAccountInfo_Type[]>(`/account/fetch-accounts-by-name/${accountSearchText}`, {withCredentials: true})
                setSearchedAccounts(response.data)
            }
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving accounts. Location: interaction context[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving accounts. Location: interaction context[Frontend]', err)
            }
        }
    }

    useEffect(() => {
        handleAccountSearch()
    }, [accountSearchText])

    return (
        <InteractionContext value={
            {
                accountSearchText, setAccountSearchText,
                searchedAccounts, setSearchedAccounts,
                handleRelationship, handleAccountSearch
            }
        }>
            {children}
        </InteractionContext>
    )
}

export const useInteractionsContext = (): Interactions_Interface => {
    const context = useContext(InteractionContext)
    if(!context){
        throw new Error("useInteractionsContext must be used within a NavigationContextProvider")
    }
    return context
}