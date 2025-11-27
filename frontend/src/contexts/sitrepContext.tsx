import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { AddSitrep_Type, Sitrep_Interface } from "../configs/types_and_interfaces";
import { sitrep_template } from "../configs/templates";
import customAPI from "../api/customAPI";
import { useStartupContext } from "./startupContext";

interface SitrepContext_Interface {
    sitrep: AddSitrep_Type
    setSitrep: Dispatch<SetStateAction<AddSitrep_Type>>

    sitrepImageNumber: number
    setSitrepImageNumber: Dispatch<SetStateAction<number>>

    sitrepUploading: boolean
    setSitrepUploading: Dispatch<SetStateAction<boolean>>

    displaySitreps: Sitrep_Interface[] | undefined
    setDisplaySitreps: Dispatch<SetStateAction<Sitrep_Interface[] | undefined>>

    userSitreps: Sitrep_Interface[] | undefined
    setUserSitreps: Dispatch<SetStateAction<Sitrep_Interface[] | undefined>>

    handleSitrepInputChange: (field: string, value: File[] | string) => void 
    handleSitrepImageSelection: (idx: number) => void
    handleSitrepImageDeletions: (index: number) => void 
    handleSitrepSubmit: () => Promise<string> 
    getSitreps: ()=> Promise<void>
}

const SitrepContext = createContext<SitrepContext_Interface | undefined>(undefined)

interface SitRepProviderProps {
    children: ReactNode
}

export const SitrepContextProvider: FC<SitRepProviderProps> = ({children}) => {

    const {activeAccountId} = useStartupContext()
    
    const [sitrep, setSitrep] = useState<AddSitrep_Type>(structuredClone(sitrep_template))
    const [sitrepImageNumber, setSitrepImageNumber] = useState<number>(0)
    const [sitrepUploading, setSitrepUploading] = useState<boolean>(false)

    const [displaySitreps, setDisplaySitreps] = useState<Sitrep_Interface[] | undefined>(undefined)
    const [userSitreps, setUserSitreps] = useState<Sitrep_Interface[] | undefined>(undefined)

    const handleSitrepInputChange = (field: string, value: File[] | string): void => {
        setSitrep(prev => {
            const updatedData = {...prev.sitrepData}
            const updatedPreview = {...prev.sitrepPreview}

            if(field === 'description'){
                updatedData[field] = value as string
            }else if(field === 'images'){
                const prevImages = updatedData.images || []
                let files: File[] = value as File[] || []
                const finalFiles = [...prevImages, ...files]
                updatedPreview.images = finalFiles.map(f => typeof f !== 'string' ? URL.createObjectURL(f) : f)
                updatedData.images = finalFiles as File[]
            }

            const updatedSitrep: AddSitrep_Type = {
                sitrepData: updatedData,
                sitrepPreview: updatedPreview
            }

            return updatedSitrep
        })
    }

    const handleSitrepImageSelection = (idx: number): void => {
        let nextNumber: number = 0
        if(sitrep.sitrepPreview.images ){
           nextNumber = sitrepImageNumber + idx
            if(idx === -1 &&  nextNumber !== -1){
                setSitrepImageNumber(nextNumber)
            }else if(idx === 1 && nextNumber < sitrep.sitrepPreview.images.length){
                setSitrepImageNumber(nextNumber)
            }
        }
    }

    const handleSitrepImageDeletions = (index: number): void => {
        setSitrep(prev => {
            let updatedData = {...prev.sitrepData}
            let updatedPreview = {...prev.sitrepPreview}

            if(index === updatedPreview.images?.length as number - 1){
                setSitrepImageNumber(sitrepImageNumber - 1)
            }

            updatedData.images = updatedData.images?.filter((_, idx) => idx !== index) as File[] || undefined
            updatedPreview.images = updatedPreview.images?.filter((_, idx) => idx !== index) || undefined

            const updatedSitrep: AddSitrep_Type = {
                sitrepData: updatedData,
                sitrepPreview: updatedPreview
            }

            return updatedSitrep
        })
    }

    const handleSitrepSubmit = async(): Promise<string> => {

        setSitrepUploading(true)
        const formData = new FormData()
        if(!sitrep.sitrepData.images){
            throw new Error("Atleast one sitrep image is required")
        }

        formData.append('description', String(sitrep.sitrepData.description))

        if(Array.isArray(sitrep.sitrepData.images)){
            sitrep.sitrepData.images.forEach((file, idx) => {
                if(file instanceof File){
                    formData.append(`sitrepImage_${idx}`, file)
                }
            })
        }

        try {
            await customAPI.post("/sitrep/add-sitrep", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSitrepUploading(false)
            setSitrep(structuredClone(sitrep_template))
            return "success";
        } catch (err) {
            console.error("Error creating post:", err);
            return "failure";
        }
    } 

    const getSitreps = async(): Promise<void> => {
        try {
            const response = await customAPI.get<Sitrep_Interface[]>("/sitrep/all-sitrep",  {withCredentials: true})
            const allSitreps = response.data
            
            // Safety check to ensure IDs exist before converting
            if (!activeAccountId) {
                console.error("No Active Account ID found");
                return;
            }

            const activeIdStr = activeAccountId.toString();

            // 1. Filter for Current User (IS Equal ===)
            // This puts "My Sitreps" into the userSitreps variable
            const userSitreps = allSitreps.filter(s => 
                s.account._id.toString() === activeIdStr
            );

            // 2. Filter for Others (NOT Equal !==)
            // This puts "Everyone Else" into the otherSitreps variable
            const otherSitreps = allSitreps.filter(s => 
                s.account._id.toString() !== activeIdStr
            );

            setUserSitreps(userSitreps);
            setDisplaySitreps(otherSitreps);

        } catch (err) {
            console.error("Error fetching sitreps:", err);
        }
    }

    useEffect(() => {
        // Only run if we actually have an ID
        if (activeAccountId) {
            getSitreps()
        }
    }, [activeAccountId])
    return(
        <SitrepContext.Provider value={
            {
                sitrep, setSitrep,
                sitrepImageNumber, setSitrepImageNumber,
                sitrepUploading, setSitrepUploading,
                displaySitreps, setDisplaySitreps,
                userSitreps, setUserSitreps,
                handleSitrepInputChange, handleSitrepImageSelection,
                handleSitrepImageDeletions, handleSitrepSubmit,
                getSitreps
            }
        }>
            {children}
        </SitrepContext.Provider>
    )
}

export const useSitrepContext = () => {
    const context = useContext(SitrepContext)
    if (!context) {
        throw new Error("SitrepContext must be used within a SitrepContextProvider")
    }
    return context
}