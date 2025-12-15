import { ObjectId } from "mongoose"
import { Error_Interface, Posts_Interface, PostsSummary_Interface, PostSummarySpecificAccount_Interface } from "../configs/types_and_interfaces"
import Post from "../models/posts"

export const fetchAllPosts = async(): Promise<PostsSummary_Interface[] | Error_Interface> => {
    try{
        const response = await Post.find({}, '_id thumbnail expeditionName date description days totalDistance expenses amenities season environment transport landscape difficulty locationString footfall dangers account interactions')
        .populate("account", "_id profilePicture userName")
        .populate("interactions", "likes comments")
        .populate({path: "interactions", populate: {path: "comments.account", select: "_id userName profilePicture"}})
        .sort({ createdAt: -1 })
        .lean<PostsSummary_Interface[]>()
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching posts', error: err.message, location: 'Post Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Posts Utils'}
        }
    }
}

export const fetchAllPostsOfSpecificAccount = async(accountId: string | ObjectId): Promise<PostSummarySpecificAccount_Interface[] | Error_Interface | null> => {
    try{
        const response: PostSummarySpecificAccount_Interface[] = await Post.find({account: accountId}, '_id thumbnail domainString').sort({ createdAt: -1 })
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching posts', error: err.message, location: 'Post Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Posts Utils'}
        }
    }
}

export const fetchSpecificPost = async(postId: string | ObjectId): Promise<Posts_Interface | Error_Interface | null> => {
    try{
        const response: Posts_Interface | null = await Post.findById({_id: postId})
        .populate("account", "_id profilePicture userName")
        .populate("interactions", "likes comments")
        .populate({path: "interactions", populate: {path: "comments.account", select: "_id userName profilePicture"}})
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching posts', error: err.message, location: 'Post Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Posts Utils'}
        }
    }
}

export const embeddingTextBuilder = (post: Partial<Posts_Interface>): string => {
    return post.tags?.split(",").map(t => t.trim().toLowerCase()).filter(Boolean).join("\n") ?? ""
}