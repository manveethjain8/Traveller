import { ObjectId } from "mongoose"
import { Error_Interface, Posts_Interface, PostsSummary_Interface, PostSummarySpecificAccount_Interface } from "../configs/types_and_interfaces"
import Post from "../models/posts"

export const fetchAllPosts = async(): Promise<PostsSummary_Interface[] | Error_Interface> => {
    try{
        const response = await Post.find({}, '_id thumbnail expeditionName date introduction days totalDistance expenses amenities season environment transport landscape difficulty locationString footfall dangers account').populate("account", "_id profilePicture userName").sort({ createdAt: -1 })
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
    const parts: string[] = []

    if(post.expeditionName) parts.push(`Expedition: ${post.expeditionName}`)
    if(post.introduction) parts.push(`Introduction: ${post.introduction}`)
    if(post.description) parts.push(`Description: ${post.description}`)

    if (post.locationString) parts.push(`Location: ${post.locationString}`)
    if (post.environment) parts.push(`Environment: ${post.environment}`)
    if (post.landscape) parts.push(`Landscape: ${post.landscape}`)
    if (post.transport) parts.push(`Transport: ${post.transport}`)
    if (post.season) parts.push(`Season: ${post.season}`)
    if (post.amenities) parts.push(`Amenities: ${post.amenities}`)
    if (post.difficulty) parts.push(`Overall difficulty: ${post.difficulty}`)
    if (post.footfall) parts.push(`Footfall: ${post.footfall}`)
    if (post.dangers) parts.push(`Health risks: ${post.dangers}`)

    if (post.totalDistance != null) {
        parts.push(`Total distance: ${post.totalDistance} km`)
    }
    if (post.expenses != null) {
        parts.push(`Total expenses: ${post.expenses}`)
    }
    if (post.days != null) {
        parts.push(`Days: ${post.days}`)
    }
    if (post.date) {
        parts.push(`Date: ${post.date}`)
    }

    return parts.join("\n")
}