import { ObjectId } from "mongoose"
import { Error_Interface, Posts_Interface, PostsSummary_Interface, PostSummarySpecificAccount_Interface } from "../configs/types_and_interfaces"
import Post from "../models/posts"

export const fetchAllPosts = async(): Promise<PostsSummary_Interface[] | Error_Interface> => {
    try{
        const response = await Post.find({}, '_id thumbnail expeditionName date introduction days totalDistance expenses amenities season environment transport landscape difficulty locationString footfall healthRisks account').populate("account", "_id profilePicture userName").sort({ createdAt: -1 })
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching posts', error: err.message, location: 'Post Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Posts Utils'}
        }
    }
}

export const fetchAllPostsOfSpecificAccount = async(accountId: string | ObjectId): Promise<PostSummarySpecificAccount_Interface[] | Error_Interface> => {
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