import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react"
import type { AddPost_Type, IndividualLeg_type } from "../configs/types_and_interfaces"
import { addPost_Template, addPostPreview_Template, individualLeg_Template, legPreview_Template } from "../configs/templates"
import customAPI from "../api/customAPI"
import {loadFromLocalStorage, saveToLocalStorage } from "../utils/temporaryStorage"

interface AddPostContext_Interface {
    post: AddPost_Type
    setPost: Dispatch<SetStateAction<AddPost_Type>>

    legs: IndividualLeg_type[]
    setLegs: Dispatch<SetStateAction<IndividualLeg_type[]>>
    activeLegId: string
    setActiveLegId: Dispatch<SetStateAction<string>>
    activeLeg: IndividualLeg_type | null
    setActiveLeg: Dispatch<SetStateAction<IndividualLeg_type | null>>

    uploading: boolean
    setUploading: Dispatch<SetStateAction<boolean>>

    handlePostInputChange: <K extends keyof AddPost_Type['postData']>(field: K, value: AddPost_Type['postData'][K]) => void
    handleThumbnailImageRemoval: () => void
    handleLegInputChange: (legId: string, field: keyof IndividualLeg_type['legData'], value: any, index?: number) => void

    handleSetLegs: () => void
    handleDeleteLegs: (id: string) => void
    handleActiveLeg: () => void 
    handleLegPhotoDelete: (legId: string,  type: number, index?: number) => void 
    handleDeleteLegPoints: (field: 'highlights' | 'challenges', idx: number)=> void

    handlePost: (domain: 'public' | 'private') => Promise<string>
}

const AddPostContext = createContext<AddPostContext_Interface | undefined>(undefined)

interface AddPostProviderProps {
    children: ReactNode
}

export const AddPostContextProvider: FC<AddPostProviderProps> = ({children}) => {
    const [post, setPost] = useState<AddPost_Type>({postData: {...addPost_Template}, postPreview: {...addPostPreview_Template}})
    const [legs, setLegs] = useState<IndividualLeg_type[]>([structuredClone({id: '1', name: 'Leg 1', legData: {...individualLeg_Template}, legPreview: {...legPreview_Template}})])
    const [activeLegId, setActiveLegId] = useState<string>('1')
    const [activeLeg, setActiveLeg] = useState<IndividualLeg_type | null>(null)

    const [uploading, setUploading] = useState<boolean>(false)


    const [isRefreshed, setIsRefreshed] = useState(false);


    useEffect(() => {
        let refreshed = false;

        // Modern API
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0 && (navEntries[0] as any).type === "reload") {
            refreshed = true;
        }

        // Fallback for older browsers
        else if ((performance as any).navigation?.type === 1) {
            refreshed = true;
        }

        setIsRefreshed(refreshed);
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
        const saveData = async () => {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }

            const hasPostData = post && Object.keys(post.postData).length > 0;
            const hasLegsData = legs && legs.length > 0;

            if (hasPostData || hasLegsData) {
                await saveToLocalStorage(post, legs);
            }
        };

        saveData();
    }, [post, legs]);


    useEffect(() => {
        const loadData = async () => {
            if (!isRefreshed) return;

            const { post: savedPost, legs: savedLegs } = await loadFromLocalStorage(true);




            setPost(savedPost )
            if (savedLegs && savedLegs.length > 0) setLegs(savedLegs);
        };

        loadData();
    }, [isRefreshed]);




    const handlePostInputChange = <K extends keyof AddPost_Type['postData']>(field: K, value: AddPost_Type['postData'][K]):void => {
       setPost(prev => {
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
        if(post.postPreview.thumbnail){
            URL.revokeObjectURL(post.postPreview.thumbnail)
        }
        handlePostInputChange('thumbnail', undefined)
        post.postPreview.thumbnail = undefined
    }

    const handleSetLegs = (): void => {
        const lastLeg = legs.at(-1) as IndividualLeg_type
        const newLegId = String(Number(lastLeg.id) + 1)
        const newLeg: IndividualLeg_type = structuredClone({
            id: newLegId,
            name: `Leg ${newLegId}`,
            legData: individualLeg_Template,
            legPreview: legPreview_Template
        });
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

                const updatedLegData = {...l.legData,}
                const updatedPreview = { ...l.legPreview }

                const stringFields = ["legIntroduction", "startDate", "environment", "landscape", "weather", "locationString", "conclusion", "startTime", "endTime", "difficulty", "traffic", "roadConditions", "notes"] as const
                type StringFields = typeof stringFields[number]

                const numberFields = ["legDistance", "expenses"]
                type NumberFields = typeof numberFields[number]

                const nestedFields = ["restaurants", "fuelAndServices", "stays", "network"] as const
                type NestedFields = typeof nestedFields[number]
                    
                if (field === "startPhoto" || field === "endPhoto") {
                    const file = value
                    updatedLegData[field] = file
                    updatedPreview[field] = file ? URL.createObjectURL(file) : undefined;
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
                    const nested = { 
                        availability: updatedLegData[f]?.availability ?? undefined,
                        recommendation: updatedLegData[f]?.recommendation ?? undefined
                    };

                    if (index === 0) {
                        nested.availability = value;
                    } else if (index === 1) {
                        nested.recommendation = value;
                    }

                    updatedLegData[f] = nested;

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

    const handlePost = async (domain: "public" | "private"): Promise<string> => {
        if (!post.postData.thumbnail) {
            throw new Error("Thumbnail is required"); // ensures backend validation passes
        }

        const formData = new FormData();

        // Append postData fields
        Object.entries(post.postData).forEach(([key, value]) => {
            if (value instanceof File) formData.append(key, value);
            else formData.append(key, String(value));
        });

        // Append legs metadata (without images)
        const legsWithoutFiles = legs.map(l => {
            const { startPhoto, endPhoto, photoDump, ...rest } = l.legData;
            return rest;
        });
        formData.append("legsWithoutFiles", JSON.stringify(legsWithoutFiles));

        // Append leg images only (startPhoto, endPhoto, photoDump)
        legs.forEach((l, idx) => {
            const { startPhoto, endPhoto, photoDump } = l.legData;

            if (startPhoto instanceof File) formData.append(`legStartPhoto_${idx}`, startPhoto);
            if (endPhoto instanceof File) formData.append(`legEndPhoto_${idx}`, endPhoto);

            if (Array.isArray(photoDump)) {
                photoDump.forEach(file => {
                    if (file instanceof File) formData.append(`photoDump_${idx}`, file);
                });
            }
        });

        // Domain
        formData.append("domainString", domain);

        try {
            await customAPI.post("/post/upload-post", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploading(false)
            return "success";
        } catch (err) {
            console.error("Error creating post:", err);
            return "failure";
        }
    };





    return(
        <AddPostContext.Provider value={
            {
                post,setPost,
                legs, setLegs,
                activeLegId, setActiveLegId,
                activeLeg, setActiveLeg,
                uploading, setUploading,
                handlePostInputChange, handleThumbnailImageRemoval,
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