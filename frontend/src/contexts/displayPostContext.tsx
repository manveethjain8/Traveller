import { createContext, useContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import type { Comment_Interface, IndividualLeg_Interface, Posts_Interface, PostsSummary_Type, PostSummarySpecificAccount_Type, SemanticPostsSummary_Interface } from "../configs/types_and_interfaces";
import customAPI from "../api/customAPI";
import { socket } from "../socket";

interface DisplayPostContext_Interface {
    allPosts: PostsSummary_Type[] | undefined
    setAllPosts: Dispatch<SetStateAction<PostsSummary_Type[] | undefined>>

    accountAllPosts: PostSummarySpecificAccount_Type[] | undefined
    setAccountAllPosts: Dispatch<SetStateAction<PostSummarySpecificAccount_Type[] | undefined>>

    semanticPosts: SemanticPostsSummary_Interface[] | undefined
    setSemanticPosts: Dispatch<SetStateAction<SemanticPostsSummary_Interface[] | undefined>>

    fullPost: Posts_Interface | undefined
    setFullPost: Dispatch<SetStateAction<Posts_Interface | undefined>>

    activeDisplayLegId: string | undefined
    setActiveDisplayLegId: Dispatch<SetStateAction<string | undefined>>
    activeDisplayLeg: IndividualLeg_Interface | undefined
    setActiveDisplayLeg: Dispatch<SetStateAction<IndividualLeg_Interface | undefined>>

    postQuery: string | undefined
    setPostQuery: Dispatch<SetStateAction<string | undefined>>

    getAllPosts: () => Promise<void> 
    getSpecificPost: (postId: string) => Promise<void>
    getSemanticPosts: () => Promise<void>
}

const DisplayPostContext = createContext<DisplayPostContext_Interface | undefined>(undefined)

interface DisplayPostProviderProps {
    children: ReactNode
}

export const DisplayPostContextProvider: FC<DisplayPostProviderProps> = ({children}) => {
    const [allPosts, setAllPosts] = useState<PostsSummary_Type[] | undefined>(undefined)
    const [accountAllPosts, setAccountAllPosts] = useState<PostSummarySpecificAccount_Type[] | undefined>(undefined)
    const [semanticPosts, setSemanticPosts] = useState<SemanticPostsSummary_Interface[] | undefined>(undefined)

    const [fullPost, setFullPost] = useState<Posts_Interface | undefined>(undefined)
    const [activeDisplayLeg, setActiveDisplayLeg] = useState<IndividualLeg_Interface | undefined>(undefined)
    const [activeDisplayLegId, setActiveDisplayLegId] = useState<string | undefined>(undefined)

    const [postQuery, setPostQuery] = useState<string | undefined>(undefined)

    const getAllPosts = async(): Promise<void> => {
        try{
            const result = await customAPI.get<PostsSummary_Type[] | undefined>('post/all-posts', {withCredentials: true})
            setAllPosts(result.data)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving recent posts. Location: displayPostContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving recent posts. Location: displayPostContext[Frontend]', err)
            }
        }
    }

    type LikeUpdates = {
        postId: string,
        likes: string[]
    }

    useEffect(() => {
        const onLikeUpdate = ({postId, likes}: LikeUpdates) => {
            setAllPosts(prev => 
                prev?.map(post => post._id === postId ? {...post, interactions: {...post.interactions, likes}} : post)
            )

            setFullPost(prev => {
                if(!prev) return prev
                return {
                    ...prev,
                    interactions: {
                        ...prev.interactions,
                        likes
                    }
                }
            })
        }

        socket.on("likeUpdated", onLikeUpdate);

        return () => {
            socket.off("likeUpdated", onLikeUpdate)
        }
    }, [])

    type CommentAddedPayload = {
        postId: string
        comment: Comment_Interface
    }

    useEffect(() => {
        const onCommentUpdate = ({postId, comment}: CommentAddedPayload) => {
            setAllPosts(prev =>
                prev?.map(post => {
                    if (post._id !== postId) return post

                    const comments = Array.isArray(post.interactions.comments)
                        ? post.interactions.comments
                        : []

                    return {
                        ...post,
                        interactions: {
                        ...post.interactions,
                        comments: [comment, ...comments]
                        }
                    }
                })
            )

            setFullPost(prev => {
                 if (!prev) return prev

                const comments = Array.isArray(prev.interactions.comments)
                    ? prev.interactions.comments
                    : []

                return {
                    ...prev,
                    interactions: {
                    ...prev.interactions,
                    comments: [comment, ...comments]
                    }
                }
            })
        }


        socket.on("commentUpdated", (data) => {
            console.log("New Comment", data)
        })

        socket.on("commentUpdated", onCommentUpdate);

        return () => {
            socket.off("commentUpdated", onCommentUpdate)
        }
    }, [])

    const getSpecificPost = async(postId: string): Promise<void> => {
        try{
            const result = await customAPI.get<Posts_Interface>(`post/specific-post/${postId}`, {withCredentials: true})
            setFullPost(result.data)
            setActiveDisplayLegId(result.data.legs[0]._id)
        }catch(err){
            if (err instanceof Error){
                console.log('Error retrieving recent posts of specific account. Location: displayPostContext[Frontend]', err)
            }else{
                console.log('Unknown error occured while retrieving recent posts of specific account. Location: displayPostContext[Frontend]', err)
            }
        }
    }

    interface SemanticSearchResponse {
        query: string
        count: number
        results: SemanticPostsSummary_Interface[]
    }

    const getSemanticPosts = async(): Promise<void> => {
        try{
                if (!postQuery || !postQuery.trim()) {      // or keep previous results / do nothing
                    return;
                }

            const response = await customAPI.get<SemanticSearchResponse>("post/semanticSearchPosts", {
                params: { query: postQuery },         // 🔹 send query → backend
                withCredentials: true,
            })

            console.log(response.data)
            const resultDocs = response.data.results.map((item: any) => item._doc)

            setSemanticPosts(resultDocs)
        }catch(err){
            if (err instanceof Error) {
                console.log(
                    "Error retrieving semantic posts. Location: displayPostContext[Frontend]",
                    err
                )
            } else {
                console.log(
                    "Unknown error occured while retrieving semantic posts. Location: displayPostContext[Frontend]",
                    err
                )
            }
        }
    }

    useEffect(() => {
        const reqLeg: IndividualLeg_Interface | undefined = fullPost?.legs.find((l) => {
            if(activeDisplayLegId === l._id){
                return l
            }
        })
        setActiveDisplayLeg(reqLeg)
    }, [activeDisplayLegId])

    useEffect(() => {
        getAllPosts()
    }, [])


    return (
        <DisplayPostContext.Provider value={
            {
                allPosts, setAllPosts,
                accountAllPosts, setAccountAllPosts,
                fullPost, setFullPost,
                semanticPosts, setSemanticPosts,
                activeDisplayLegId, setActiveDisplayLegId,
                activeDisplayLeg, setActiveDisplayLeg,
                postQuery, setPostQuery,
                getAllPosts, getSpecificPost,
                getSemanticPosts
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