import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import type { AddPost_Type, IndividualLeg_type } from "../configs/types_and_interfaces"
import { addPost_Template, individualLeg_Template } from "../configs/templates"

interface AddPostContext_Interface {
    newPost: AddPost_Type
    setNewPost: Dispatch<SetStateAction<AddPost_Type>>
    tnPreview: string | null
    setTnPreview: Dispatch<SetStateAction<string | null>>

    legs: IndividualLeg_type[]
    setLegs: Dispatch<SetStateAction<IndividualLeg_type[]>>
    activeLegId: string
    setActiveLegId: Dispatch<SetStateAction<string>>
    activeLeg: IndividualLeg_type | []
    setActiveLeg: Dispatch<SetStateAction<IndividualLeg_type | []>>

    handleNewPostInputChange: <K extends keyof AddPost_Type>(field: K, value: AddPost_Type[K]) => void
    handleThumbnailImageRemoval: () => void

    handleSetLegs: () => void
    handleDeleteLegs: (id: string) => void
    handleActiveLeg: () => void 
}

const AddPostContext = createContext<AddPostContext_Interface | undefined>(undefined)

interface AddPostProviderProps {
    children: ReactNode
}

export const AddPostContextProvider: FC<AddPostProviderProps> = ({children}) => {
    const [newPost, setNewPost] = useState<AddPost_Type>(addPost_Template)
    const [tnPreview, setTnPreview] = useState<string | null>(null)
    const [legs, setLegs] = useState<IndividualLeg_type[]>([{id: '1', name: 'Leg 1', legData: {...individualLeg_Template}}])
    const [activeLegId, setActiveLegId] = useState<string>('1')
    const [activeLeg, setActiveLeg] = useState<IndividualLeg_type | []>([])

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

    const handleThumbnailImageRemoval = (): void => {
        if(tnPreview){
            URL.revokeObjectURL(tnPreview)
        }
        handleNewPostInputChange('thumbnail', undefined)
        setTnPreview(null)
    }

    const handleSetLegs = (): void => {
        const lastLeg = legs.at(-1) as IndividualLeg_type
        const newLegId = String(Number(lastLeg.id) + 1)
        const newLeg = {id: newLegId, name: `Leg ${newLegId}`, legData: {...individualLeg_Template}}
        setActiveLegId(newLegId)
        setLegs(prevLegs => [...prevLegs, newLeg])
    }

    const handleDeleteLegs = (id: string): void => {
        setLegs(prevLegs => {
            if(prevLegs.length === 1){
                alert("Atleast 1 leg must be present")
                return prevLegs
            }

            const updatedLegs = prevLegs.filter(l => l.id !== id)

            const renumberedLegs = updatedLegs.map((l, idx) => ({
                ...l,
                id: String(idx + 1),
                name: `Leg ${String(idx + 1)}`
            }))

            if (activeLegId === id || Number(activeLegId) > Number(id)) {
                setActiveLegId(String(Number(activeLegId) - 1))
            } else if (Number(activeLegId) < Number(id)) {
                setActiveLegId(activeLegId)
            }
            return renumberedLegs
        })
    }

    useEffect(() => {
        handleActiveLeg()
    },[legs, activeLegId])
    
    const handleActiveLeg = (): void => {
        const ActiveLeg = legs.find(l => l.id === activeLegId) as IndividualLeg_type
        setActiveLeg(ActiveLeg)
    }

    return(
        <AddPostContext.Provider value={
            {
                newPost, setNewPost,
                tnPreview, setTnPreview,
                legs, setLegs,
                activeLegId, setActiveLegId,
                activeLeg, setActiveLeg,
                handleNewPostInputChange, handleThumbnailImageRemoval,
                handleSetLegs, handleDeleteLegs,
                handleActiveLeg
            }
        }>
            {children}
        </AddPostContext.Provider>
    )
}

export const useAddPostContext = () => {
    const context = useContext(AddPostContext)
    if (!context) {
        throw new Error("AddPostContext must be used within a ProfileContextProvider")
    }
    return context
}