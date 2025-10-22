import { Error_Interface, Posts_Interface } from "../configs/types_and_interfaces"
import Post from "../models/posts"

export const fetchAllPosts = async(): Promise<Posts_Interface[] | Error_Interface> => {
    try{
        const response: Posts_Interface[] = await Post.find({}, '_id thumbnail expeditionName date introduction days totalDistance expenses amenities season environment transport landscape difficulty locationString footfall healthRisks').populate("account", "_id profilePicture userName").sort({ createdAt: -1 })
        return response
    }catch(err: unknown){
        if(err instanceof Error){
            return {message: 'Error fetching posts', error: err.message, location: 'Post Utils'}
        }else{
            return {message: 'Unknown error has occured', error: JSON.stringify(err), location: 'Posts Utils'}
        }
    }
}