import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import customAPI from "../api/customAPI"
import type { LimitedAccountInfo_Type } from "../configs/types_and_interfaces"
import { useStartupContext } from "./startupContext"

interface Interactions_Interface {
    accountSearchText: string | undefined
    setAccountSearchText: Dispatch<SetStateAction<string | undefined>>
    searchedAccounts: LimitedAccountInfo_Type[] | []
    setSearchedAccounts: Dispatch<SetStateAction<LimitedAccountInfo_Type[] | []>>

    handleRelationship: (toBeFollowedId: string, followerId: string) => Promise<string>
    handleAccountSearch: () => Promise<void>
    getRelationship: (followingId: string, followerId: string) => Promise<string>
    handleLikes: (postId: string) => Promise<string> 
    handleComments: (serviceType: number, postId: string, comment: string, commentId?: string) => Promise<string> 
}

const InteractionContext = createContext<Interactions_Interface | undefined>(undefined)

interface InteractionsProviderProps { 
    children: ReactNode
}

export const InteractionsContextProvider: FC<InteractionsProviderProps> = ({children}) => {

    const {activeAccountId} = useStartupContext()

    const [searchedAccounts, setSearchedAccounts] = useState<LimitedAccountInfo_Type[] | []>([])
    const [accountSearchText, setAccountSearchText] = useState<string | undefined>(undefined)

    const handleRelationship = async(toBeFollowedId: string, followerId: string): Promise<string> => {
        try{
            const relationship = {toBeFollowedId, followerId}
            await customAPI.post('/interaction/following-unfollowing', relationship, {withCredentials: true})
            return('success')
        }catch(err){
            if (err instanceof Error){
                console.log('Error updating relationship. Location: interaction context[Frontend]', err)
            }else{
                console.log('Unknown error occured while updating relationship. Location: interaction context[Frontend]', err)
            }
            return('failure')
        }
    }

    const getRelationship = async(following: string, follower: string): Promise<any> => {
        try{
            const relationship = {following, follower}
            const response = await customAPI.post('/interaction/check-relationship', relationship, {withCredentials: true})
            return(response.data.message)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving relationship. Location: interaction context[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving relationship. Location: interaction context[Frontend]', err)
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


    const handleLikes = async(postId: string): Promise<string> => {
        try{
            const likeInfo = {postId, accountId: activeAccountId }
            await customAPI.post('/interaction/likes', likeInfo, {withCredentials: true})
            return ('success')
        }catch(err){
            if (err instanceof Error){
                console.log('Error updating likes. Location: interaction context[Frontend]', err)
            }else{
                console.log('Unknown error occured while updating likes. Location: interaction context[Frontend]', err)
            }
            return('failure')
        }
    }

    const handleComments = async(serviceType: number, postId: string, comment: string, commentId?: string): Promise<string> => {
        try{
            const commentInfo = {serviceType, accountId: activeAccountId , postId, comment, commentId}
            await customAPI.post('/interaction/comments', commentInfo, {withCredentials: true})
            return ('success')
        }catch(err){
            if (err instanceof Error){
                console.log('Error updating comments. Location: interaction context[Frontend]', err)
            }else{
                console.log('Unknown error occured while updating comments. Location: interaction context[Frontend]', err)
            }
            return('failure')
        }
    }

    return (
        <InteractionContext value={
            {
                accountSearchText, setAccountSearchText,
                searchedAccounts, setSearchedAccounts,
                handleRelationship, handleAccountSearch,
                getRelationship, handleLikes,
                handleComments
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