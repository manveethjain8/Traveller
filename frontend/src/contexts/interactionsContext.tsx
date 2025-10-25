import { createContext, useContext, type FC, type ReactNode } from "react"
import customAPI from "../api/customAPI"

interface Interactions_Interface {
    handleRelationship: (toBeFollowedId: string, followerId: string) => Promise<string>
}

const InteractionContext = createContext<Interactions_Interface | undefined>(undefined)

interface InteractionsProviderProps { 
    children: ReactNode
}

export const InteractionsContextProvider: FC<InteractionsProviderProps> = ({children}) => {

    const handleRelationship = async(toBeFollowedId: string, followerId: string): Promise<string> => {
        try{
            const relationship = {toBeFollowedId, followerId}
            await customAPI.post('/interaction/following-unfollowing', relationship, {withCredentials: true})
            return('success')
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving account details. Location: profileContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving account details. Location: profileContext[Frontend]', err)
            }
            return('failure')
        }
    }

    return (
        <InteractionContext value={
            {
                handleRelationship
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