import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import {customAPI, fastAPI_client} from "../api/customAPI"
import type { PlaceWithImagesResponse, LimitedAccountInfo_Type, PlaceInfo, PlaceImage } from "../configs/types_and_interfaces"
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

    additionalInformationClicked: boolean
    setAdditionalInformationClicked: Dispatch<SetStateAction<boolean>>
    additionalInformationPostId: string | undefined
    setAdditionalInformationActivePostId: Dispatch<SetStateAction<string | undefined>>

    additionalOption: string
    setAdditionalOption: Dispatch<SetStateAction<string>>

    placeInfo: PlaceWithImagesResponse | null
    setPlaceInfo: Dispatch<SetStateAction<PlaceWithImagesResponse | null>>

    toggleAdditionalInformation: (id: string) => void 
    fetchAdditinalInformation: (destination: string) => Promise<void> 
}

const InteractionContext = createContext<Interactions_Interface | undefined>(undefined)

interface InteractionsProviderProps { 
    children: ReactNode
}

export const InteractionsContextProvider: FC<InteractionsProviderProps> = ({children}) => {

    const {activeAccountId} = useStartupContext()

    const [searchedAccounts, setSearchedAccounts] = useState<LimitedAccountInfo_Type[] | []>([])
    const [accountSearchText, setAccountSearchText] = useState<string | undefined>(undefined)

    const [additionalInformationClicked, setAdditionalInformationClicked]= useState<boolean>(false)
    const [additionalInformationPostId, setAdditionalInformationActivePostId] = useState<string | undefined>(undefined)

    const [additionalOption, setAdditionalOption] = useState<string>('Info')

    const [placeInfo, setPlaceInfo] = useState<PlaceWithImagesResponse | null>(null)

    useEffect(() => {
        const value: string  = localStorage.getItem('additionalInformationCategory') ||  'info'
        if(value){
            setAdditionalOption(value)
        }
    }, [])

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
            const likeInfo = {sentPostId:postId, sentAccountId: activeAccountId }
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
            const commentInfo = {serviceType, sentAccountId: activeAccountId , sentPostId: postId, sentComment: comment, sentCommentId: commentId}
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

        const toggleAdditionalInformation = (id: string): void => {
            if(additionalInformationPostId === id){
                setAdditionalInformationClicked(false)
                setAdditionalInformationActivePostId(undefined)
            }else{
                setAdditionalInformationClicked(true)
                setAdditionalInformationActivePostId(id)
            }
        }

        const fetchAdditinalInformation = async(destination: string): Promise<void> => {
            try{
                setPlaceInfo(null)
                const [placeRes, imageRes] = await Promise.all([
                    fastAPI_client.get<PlaceInfo>(`/place/${destination}`),
                    fastAPI_client.get<{ images: PlaceImage[] }>(`/image/${destination}`)
                ])

                const finalResponse: PlaceWithImagesResponse = {
                    text: placeRes.data,
                    images: imageRes.data.images ?? []
                }

                setPlaceInfo(finalResponse)

            }catch(err){
                if (err instanceof Error){
                    console.log('Error fetching more information. Location: interaction context[Frontend]', err)
                }else{
                    console.log('Unknown error occured while fetching more information. Location: interaction context[Frontend]', err)
                }
            }
        }

    return (
        <InteractionContext value={
            {
                accountSearchText, setAccountSearchText,
                searchedAccounts, setSearchedAccounts,
                additionalInformationClicked, setAdditionalInformationClicked,
                additionalInformationPostId, setAdditionalInformationActivePostId,
                additionalOption, setAdditionalOption,
                placeInfo, setPlaceInfo,
                handleRelationship, handleAccountSearch,
                getRelationship, handleLikes,
                handleComments, toggleAdditionalInformation,
                fetchAdditinalInformation
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