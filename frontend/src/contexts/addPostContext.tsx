import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import type { AddPost_Type, IndividualLeg_type } from "../configs/types_and_interfaces"
import { addPost_Template, addPostPreview_Template, individualLeg_Template, legPreview_Template } from "../configs/templates"
import customAPI from "../api/customAPI"

interface AddPostContext_Interface {
    newPost: AddPost_Type
    setNewPost: Dispatch<SetStateAction<AddPost_Type>>

    legs: IndividualLeg_type[]
    setLegs: Dispatch<SetStateAction<IndividualLeg_type[]>>
    activeLegId: string
    setActiveLegId: Dispatch<SetStateAction<string>>
    activeLeg: IndividualLeg_type | null
    setActiveLeg: Dispatch<SetStateAction<IndividualLeg_type | null>>

    handleNewPostInputChange: <K extends keyof AddPost_Type['postData']>(field: K, value: AddPost_Type['postData'][K]) => void
    handleThumbnailImageRemoval: () => void
    handleLegInputChange: (legId: string, field: keyof IndividualLeg_type['legData'], value: any, index?: number) => void

    handleSetLegs: () => void
    handleDeleteLegs: (id: string) => void
    handleActiveLeg: () => void 
    handleLegPhotoDelete: (legId: string,  type: number, index?: number) => void 
    handleDeleteLegPoints: (field: 'highlights' | 'challenges', idx: number)=> void

    handlePost: (domain: 'public' | 'private') => Promise<void>
}

const AddPostContext = createContext<AddPostContext_Interface | undefined>(undefined)

interface AddPostProviderProps {
    children: ReactNode
}

export const AddPostContextProvider: FC<AddPostProviderProps> = ({children}) => {
    const [newPost, setNewPost] = useState<AddPost_Type>({postData: {...addPost_Template}, postPreview: {...addPostPreview_Template}})
    const [legs, setLegs] = useState<IndividualLeg_type[]>([{id: '1', name: 'Leg 1', legData: {...individualLeg_Template}, legPreview: {...legPreview_Template}}])
    const [activeLegId, setActiveLegId] = useState<string>('1')
    const [activeLeg, setActiveLeg] = useState<IndividualLeg_type | null>(null)

    const handleNewPostInputChange = <K extends keyof AddPost_Type['postData']>(field: K, value: AddPost_Type['postData'][K]):void => {
        setNewPost(prev => {
            const updatedPostData = {...prev.postData}
            const updatedPostPreview = {...prev.postPreview}

            if (field === 'thumbnail' && value instanceof File){
                updatedPostData[field] = value
                updatedPostPreview['thumbnail'] = URL.createObjectURL(value)
            }else{
                updatedPostData[field] = value
            }
            
            const updatedPost: AddPost_Type = {
                postData: updatedPostData,
                postPreview: updatedPostPreview
            }

            return updatedPost
        })
    } 

    const handleThumbnailImageRemoval = (): void => {
        if(newPost.postPreview.thumbnail){
            URL.revokeObjectURL(newPost.postPreview.thumbnail)
        }
        handleNewPostInputChange('thumbnail', undefined)
    }

    const handleSetLegs = (): void => {
        const lastLeg = legs.at(-1) as IndividualLeg_type
        const newLegId = String(Number(lastLeg.id) + 1)
        const newLeg = {id: newLegId, name: `Leg ${newLegId}`, legData: {...individualLeg_Template}, legPreview: {...legPreview_Template}}
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

    const handleLegInputChange = (
        legId: string,
        field: keyof IndividualLeg_type['legData'],
        value: any,
        index?: number
    ): void => {
        setLegs(prevLegs =>
            prevLegs.map(l => {
                if (l.id !== legId) return l;

                const updatedLegData = { ...l.legData }
                const updatedPreview = {...l.legPreview}

                const stringFields = ["legIntroduction", "startDate", "environment", "landscape", "weather", "location", "conclusion", "startTime", "endTime", "difficulty", "traffic", "roadConditions"] as const
                type StringFields = typeof stringFields[number]

                const numberFields = ["legDistance", "expenses"]
                type NumberFields = typeof numberFields[number]

                const nestedFields = ["restaurants", "fuelAndServices", "stays", "network"] as const
                type NestedFields = typeof nestedFields[number]
                    
                if (field === "startPhoto" || field === "endPhoto") {
                    const file = value
                    updatedLegData[field] = file
                    updatedPreview[field] = file ? URL.createObjectURL(file) : undefined;
                    console.log(updatedPreview.startPhoto)
                } else if (field === 'photoDump') {
                    const previousDump = updatedLegData.photoDump || []
                    const files = Array.from(value || []) as File[]
                    const finalFiles = [...previousDump , ...files];
                    updatedPreview.photoDump = finalFiles.map(file =>  typeof file !== 'string' ? URL.createObjectURL(file) : file)
                    updatedLegData.photoDump = finalFiles as (string[] | File [])
                } else if (field === 'highlights' || field === 'challenges') {
                    if (Array.isArray(value)) {
                        updatedLegData[field] = value;
                    } else {
                        const points: string[] = [...(l.legData[field]|| [])];
                        if (typeof index === "number") {
                        points[index] = value
                        } else {
                        points.push(value)
                        }
                        updatedLegData[field] = points;
                    }
                }else if (nestedFields.includes(field as NestedFields)) {
                    const f = field as NestedFields
                    updatedLegData[f] = {
                        ...updatedLegData[f],
                        availability: index === 0 ? value : updatedLegData[f].availability,
                        recommendation: index !== 0 ? value : updatedLegData[f].recommendation
                    }
                }else if(stringFields.includes(field as StringFields)){
                    (updatedLegData[field] as StringFields) = value
                } else if(numberFields.includes(field as NumberFields)) {
                    (updatedLegData[field] as NumberFields) = value
                }

            
                const updatedLeg: IndividualLeg_type = {
                    ...l,
                    legData: updatedLegData,
                    legPreview: updatedPreview,
                }
                return updatedLeg;
            })
        )
    }

    const handleLegPhotoDelete = (
        legId: string,
        type: number,
        index?: number
    ):void => {
        setLegs(prevLegs => 
            prevLegs.map(l => {
                if(l.id !== legId) return l

                const updatedLegData = { ...l.legData }
                const updatedPreview = {...l.legPreview}

                if(type === 0 && l.legPreview.startPhoto){
                    updatedPreview.startPhoto = undefined
                    updatedLegData.startPhoto = undefined
                }else if (type === 1 && l.legPreview.endPhoto){
                    updatedPreview.endPhoto = undefined
                    updatedLegData.endPhoto = undefined
                }else if (type === 2 && l.legPreview.photoDump){
                    updatedPreview.photoDump = updatedPreview.photoDump?.filter((_, idx) => idx !== index)
                    updatedLegData.photoDump = (updatedLegData.photoDump?.filter((_, idx) => idx !== index)) as (string[] | File[])
                }

                const updatedLeg: IndividualLeg_type = {
                    ...l,
                    legData: updatedLegData,
                    legPreview: updatedPreview,
                }
                return updatedLeg;
            })
        )
    }

    const handleDeleteLegPoints = (field: 'highlights' | 'challenges', idx: number): void => {
        let updated: string[] = []
        if(field === 'highlights'){
            updated = [...(activeLeg?.legData.highlights ?? [])]

        }else{
            updated = [...(activeLeg?.legData.challenges ?? [])]
        }

        updated.splice(idx, 1)

        if (updated.length === 0) {
            updated.push('');
        }

        handleLegInputChange(activeLeg?.id as string, field, updated)
    }

    const handlePost = async(domain: 'public' | 'private'): Promise<void> => {
        const postData  = new FormData()

        Object.entries(newPost.postData).forEach(([key, value]) => {
            if(value === undefined || value === null){
                postData.append(key, String(value))
            }else if(value instanceof File){
                postData.append(key, value)
            }else{
                postData.append(key, String(value))
            }
        })

        const legsWithoutFiles = legs.map(l =>{
            const {startPhoto, endPhoto, photoDump, ...rest} = l.legData
            return rest
        })

        postData.append('legsWithoutFiles', JSON.stringify(legsWithoutFiles))

        legs.forEach((l, idx) => {
            const {startPhoto, endPhoto, photoDump} = l.legData

            if(startPhoto){
                postData.append(`legStartPhoto_${idx}`, startPhoto)
            }

            if(endPhoto){
                postData.append(`legEndPhoto_${idx}`, endPhoto)
            }

            if(photoDump){
                const photoDumpArray = [...(photoDump ?? [])];
                if(Array.isArray(photoDumpArray)){
                    photoDumpArray.forEach(file => {
                        postData.append(`photoDump_${idx}`, file)
                    })
                }
            }
        })

        if(domain === 'public'){
            postData.append('domain', 'public')
        }else{
            postData.append('domain', 'private')
        }



        try{
            await customAPI.post('/post/upload-post', postData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }catch(err){
            if (err instanceof Error){
                console.log('Error while creating the post. Location: addPostContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while creating a post. Location: addPostContext[Frontend]', err)
            }
        }
    }

    return(
        <AddPostContext.Provider value={
            {
                newPost, setNewPost,
                legs, setLegs,
                activeLegId, setActiveLegId,
                activeLeg, setActiveLeg,
                handleNewPostInputChange, handleThumbnailImageRemoval,
                handleSetLegs, handleDeleteLegs,
                handleActiveLeg, handleLegInputChange,
                handleLegPhotoDelete, handleDeleteLegPoints,
                handlePost
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