import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { Posts_Interface, PostSummarySpecificAccount_Type } from "../configs/types_and_interfaces";
import customAPI from "../api/customAPI";

interface DisplayPostContext_Interface {
    allPosts: Posts_Interface[] | undefined
    setAllPosts: Dispatch<SetStateAction<Posts_Interface[] | undefined>>

    accountAllPosts: PostSummarySpecificAccount_Type[] | undefined
    setAccountAllPosts: Dispatch<SetStateAction<PostSummarySpecificAccount_Type[] | undefined>>

    getAllPosts: () => Promise<void> 
    getAllPostsOfSpecificAccount: () =>  Promise<void>
}

const DisplayPostContext = createContext<DisplayPostContext_Interface | undefined>(undefined)

interface DisplayPostProviderProps {
    children: ReactNode
}

export const DisplayPostContextProvider: FC<DisplayPostProviderProps> = ({children}) => {
    const [allPosts, setAllPosts] = useState<Posts_Interface[] | undefined>(undefined)
    const [accountAllPosts, setAccountAllPosts] = useState<PostSummarySpecificAccount_Type[] | undefined>(undefined)

    const getAllPosts = async(): Promise<void> => {
        try{
            const result = await customAPI.get<Posts_Interface[] | undefined>('post/all-posts', {withCredentials: true})
            setAllPosts(result.data)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving recent posts. Location: displayPostContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving recent posts. Location: displayPostContext[Frontend]', err)
            }
        }
    }

    const getAllPostsOfSpecificAccount = async(): Promise<void> => {
        try{
            const result = await customAPI.get<PostSummarySpecificAccount_Type[] | undefined>('post/all-posts-specific-account', {withCredentials: true})
            setAccountAllPosts(result.data)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving recent posts of specific account. Location: displayPostContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving recent posts of specific account. Location: displayPostContext[Frontend]', err)
            }
        }
    }



    return (
        <DisplayPostContext.Provider value={
            {
                allPosts, setAllPosts,
                accountAllPosts, setAccountAllPosts,
                getAllPosts, getAllPostsOfSpecificAccount
            }
        }>
            {children}
        </DisplayPostContext.Provider>
    )
}

export const useDisplayPostContext = () => {
    const context = useContext(DisplayPostContext)
    if(!context){
        throw new Error("useDisplayPostContext must be used within a StartupContextProvider")
    }
    return context
}