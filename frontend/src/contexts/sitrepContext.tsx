import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { AddSitrep_Type, Sitrep_Interface } from "../configs/types_and_interfaces";
import {sitrepData_template, sitrepPreview_template } from "../configs/templates";
import {customAPI} from "../api/customAPI";
import { useStartupContext } from "./startupContext";

interface SitrepContext_Interface {
    sitrepUploadable: AddSitrep_Type[]
    setSitrepUploadable: Dispatch<SetStateAction<AddSitrep_Type[]>>

    sitrepNumber: number
    setSitrepNumber: Dispatch<SetStateAction<number>>

   activeSitrepId: number 
   setActiveSitrepId: Dispatch<SetStateAction<number>>

   activeSitrep: AddSitrep_Type | null
   setActiveSitrep: Dispatch<SetStateAction<AddSitrep_Type | null>>

    sitrepUploading: boolean
    setSitrepUploading: Dispatch<SetStateAction<boolean>>

    otherSitreps: Sitrep_Interface[] | undefined
    setOtherSitreps: Dispatch<SetStateAction<Sitrep_Interface[] | undefined>>

    userSitreps: Sitrep_Interface[] | undefined
    setUserSitreps: Dispatch<SetStateAction<Sitrep_Interface[] | undefined>>

    displaySitreps: Sitrep_Interface[] | undefined
    setDisplaySitreps: Dispatch<SetStateAction<Sitrep_Interface[] | undefined>>

    selectedSitrep: Sitrep_Interface| undefined
    setSelectedSitrep: Dispatch<SetStateAction<Sitrep_Interface| undefined>>

    handleSetSitreps: () => void 
    handleDeleteSitreps: (id: number)=> void 
    handleSitrepInputChange: (sitrepId: number, field: string, value: File | string) => void 
    handleSitrepSelection: (idx: number) => void
    handleSitrepImageDeletions: (sitrepId: number) => void 
    handleSitrepSubmit: () => Promise<string> 
    getSitreps: ()=> Promise<void>
}

const SitrepContext = createContext<SitrepContext_Interface | undefined>(undefined)

interface SitRepProviderProps {
    children: ReactNode
}

export const SitrepContextProvider: FC<SitRepProviderProps> = ({children}) => {

    const {activeAccountId} = useStartupContext()
    
    const [sitrepUploadable, setSitrepUploadable] = useState<AddSitrep_Type[]>(() =>
        structuredClone([
            {
                id: 1,
                sitrepData: structuredClone(sitrepData_template),
                sitrepPreview: structuredClone(sitrepPreview_template)
            }
        ])
    )
    const [sitrepNumber, setSitrepNumber] = useState<number>(-1)
    const [sitrepUploading, setSitrepUploading] = useState<boolean>(false)

    const [activeSitrepId, setActiveSitrepId] = useState<number>(1)
    const [activeSitrep, setActiveSitrep] = useState<AddSitrep_Type | null>(null)

    const [otherSitreps, setOtherSitreps] = useState<Sitrep_Interface[] | undefined>(undefined)
    const [userSitreps, setUserSitreps] = useState<Sitrep_Interface[] | undefined>(undefined)

    const [displaySitreps, setDisplaySitreps] = useState<Sitrep_Interface[] | undefined>(undefined)

    const [selectedSitrep, setSelectedSitrep] = useState<Sitrep_Interface | undefined>(undefined)

    const handleSetSitreps = (): void => {
        setSitrepUploadable(prev => {
            // enforce max limit (or return prev unchanged)
            if (prev.length >= 10) return prev;

            // compute new id safely from prev
            const last = prev.at(-1);
            const newSitrepId = last ? Number(last.id) + 1 : 1;

            const newSitrep: AddSitrep_Type = {
                id: newSitrepId,
                sitrepData: structuredClone(sitrepData_template),
                sitrepPreview: structuredClone(sitrepPreview_template)
            };

            // set active id (ok to call here)
            setActiveSitrepId(newSitrepId);


            return [...prev, newSitrep];
        });
    };

    const handleActiveSitrep = (): void => {
        const activeSitrep = sitrepUploadable.find(l => l.id === activeSitrepId) as AddSitrep_Type
        setActiveSitrep(activeSitrep)
    }

    const handleDeleteSitreps = (id: number): void => {
        setSitrepUploadable(prevSitreps => {
            if(prevSitreps.length === 1){
                alert("Atleast 1 Sitrep must be present")
                return prevSitreps
            }

            const sitrepDeleted = prevSitreps.find(s => s.id === id);
            if (sitrepDeleted) {
                // Clone it (avoid mutating state directly)
                const data: AddSitrep_Type = { ...sitrepDeleted, sitrepData: { ...sitrepDeleted.sitrepData } };

                data.sitrepData.description = '';
                handleSitrepImageDeletions(data.id);
            }

            const updatedSitreps = prevSitreps.filter(s => s.id !== id)

            const renumberedSitreps = updatedSitreps.map((s, idx) => ({
                ...s,
                id: idx + 1,
            }))

            if (activeSitrepId === id || activeSitrepId > id) {
                setActiveSitrepId(activeSitrepId - 1)
            } else if (activeSitrepId < id) {
                setActiveSitrepId(activeSitrepId)
            }
            return renumberedSitreps
        })
    }

    useEffect(() => {
        handleActiveSitrep()
    },[sitrepUploadable, activeSitrepId])
    

    const handleSitrepInputChange = (sitrepId: number, field: string, value: File | string): void => {
        setSitrepUploadable(prevSitreps => {
            return prevSitreps.map(s => {
                if (s.id !== sitrepId) return s
                const updatedData = {...s.sitrepData}
                const updatedPreview = {...s.sitrepPreview}

                if(field === 'description'){
                    updatedData[field] = value as string
                }else if(field === 'image'){
                    let file: File = value as File
                    // Revoke previous preview URL if it exists (avoid memory leak)
                    if (typeof updatedPreview.image === 'string' && updatedPreview.image.startsWith('blob:')) {
                        try {
                            URL.revokeObjectURL(updatedPreview.image);
                        } catch (err) {
                            // ignore revoke errors
                        }
                    }
                    updatedPreview.image = URL.createObjectURL(file)
                    updatedData.image = file as File
                }

                const updatedSitrep: AddSitrep_Type = {
                    ...s,
                    sitrepData: updatedData,
                    sitrepPreview: updatedPreview
                }

                console.log(updatedSitrep)

                return updatedSitrep
            })
        })
    }

    const handleSitrepSelection = (idx: number): void => {
        let nextNumber: number = 0
        if(displaySitreps){
           nextNumber = sitrepNumber + idx
            if(idx === -1 &&  nextNumber !== -1){
                setSitrepNumber(nextNumber)
            }else if(idx === 1 && nextNumber < displaySitreps.length){
                setSitrepNumber(nextNumber)
            }
        }
    }
    const handleSitrepImageDeletions = (sitrepId: number):void => {
        setSitrepUploadable(prevSitreps => 
            prevSitreps.map(s => {
                if(s.id !== sitrepId) return s

                const updatedData = { ...s.sitrepData }
                const updatedPreview = {...s.sitrepPreview}

                updatedData.image = undefined
                URL.revokeObjectURL(updatedPreview.image as string)
                updatedPreview.image = undefined

                const updatedSitrep: AddSitrep_Type = {
                    ...s,
                    sitrepData: updatedData,
                    sitrepPreview: updatedPreview
                }
                return  updatedSitrep;
            })
        )
    }

    const handleSitrepSubmit = async(): Promise<string> => {

        setSitrepUploading(true)
        const formData = new FormData()
        if(sitrepUploadable.length < 1){
            throw new Error("Atleast one sitrep is required")
        }

        const metadata = sitrepUploadable.map((s, idx) => ({
            idx,
            id: s.id,
            description: s.sitrepData.description ?? ''
        }));
        formData.append('metadata', JSON.stringify(metadata));

        // append files separately using same idx so server can match them
        sitrepUploadable.forEach((s, idx) => {
            if (s.sitrepData.image instanceof File) {
                formData.append(`file_${idx}`, s.sitrepData.image);
            }
        });

        try {
            await customAPI.post("/sitrep/add-sitrep", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setSitrepUploading(false)
            setSitrepUploadable([])
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
            setOtherSitreps(otherSitreps);

        } catch (err) {
            console.error("Error fetching sitreps:", err);
        }
    }


    useEffect(() => {
        if(displaySitreps){
            setSelectedSitrep(displaySitreps[sitrepNumber])
        }
    },[sitrepNumber])

    useEffect(() => {
        // Only run if we actually have an ID
        if (activeAccountId) {
            getSitreps()
        }
    }, [activeAccountId])
    return(
        <SitrepContext.Provider value={
            {
                sitrepUploadable, setSitrepUploadable,
                sitrepNumber, setSitrepNumber,
                sitrepUploading, setSitrepUploading,
                activeSitrep, setActiveSitrep,
                activeSitrepId, setActiveSitrepId,
                otherSitreps, setOtherSitreps,
                userSitreps, setUserSitreps,
                displaySitreps, setDisplaySitreps,
                selectedSitrep, setSelectedSitrep,
                handleSetSitreps, handleDeleteSitreps,
                handleSitrepInputChange, handleSitrepSelection,
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