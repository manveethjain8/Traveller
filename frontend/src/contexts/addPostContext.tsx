import { createContext, useContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import type { AddPost_Type } from "../configs/types_and_interfaces"
import { addPost_Template } from "../configs/templates"

interface AddPostContext_Interface {
    newPost: AddPost_Type
    setNewPost: Dispatch<SetStateAction<AddPost_Type>>
    tnPreview: string | null
    setTnPreview: Dispatch<SetStateAction<string | null>>
    handleNewPostInputChange: <K extends keyof AddPost_Type>(field: K, value: AddPost_Type[K]) => void
}

const AddPostContext = createContext<AddPostContext_Interface | undefined>(undefined)

interface AddPostProviderProps {
    children: ReactNode
}

export const AddPostContextProvider: FC<AddPostProviderProps> = ({children}) => {
    const [newPost, setNewPost] = useState<AddPost_Type>(addPost_Template)
    const [tnPreview, setTnPreview] = useState<string | null>(null)

    const handleNewPostInputChange = <K extends keyof AddPost_Type>(field: K, value: AddPost_Type[K]):void => {
        if(field === 'thumbnail' && value instanceof File){
            setTnPreview(URL.createObjectURL(value))
            setNewPost(prev => ({
                ...prev,
                [field]: value
            }))
        }else{
            setNewPost(prev => ({
                ...prev,
                [field]: value
            }))
        }
    } 

    return(
        <AddPostContext.Provider value={
            {
                newPost, setNewPost,
                tnPreview, setTnPreview,
                handleNewPostInputChange
            }
        }>
            {children}
        </AddPostContext.Provider>
    )
}

export const useProfileContext = () => {
    const context = useContext(AddPostContext)
    if (!context) {
        throw new Error("AddPostContext must be used within a ProfileContextProvider")
    }
    return context
}