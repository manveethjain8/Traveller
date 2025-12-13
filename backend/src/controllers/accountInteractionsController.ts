import { Request, Response } from "express"
import FandUF from "../models/FandUF"
import { fetchRelationship } from "../utils/accountInteractionUtils";
import { Error_Interface, FandUF_Interface } from "../configs/types_and_interfaces";
import Interactions from "../models/interactions";
import Post from "../models/posts";

export const handleFollowingAndUnfollowing = async(req: Request, res: Response): Promise<any> => {
    try{
        const { toBeFollowedId, followerId } = req.body;

        if (!toBeFollowedId || !followerId) {
            return res.status(400).json({ message: "Both IDs are required" });
        }

        const existingRelation = await FandUF.findOne({ follower: followerId, following: toBeFollowedId });

        if (existingRelation) {
            await FandUF.deleteOne({ follower: followerId, following: toBeFollowedId })
            return res.status(200).json({ message: "Unfollowed successfully" })
        } else {
            const newRelation = await FandUF.create({ follower: followerId, following: toBeFollowedId })
            return res.status(200).json({ message: "Followed successfully" })
        }

    }catch (err: any) {
        console.error("Error in handleFollowingAndUnfollowing:", err.name, err.message, err);
        res.status(500).json({
            message: "Error while handling follow/unfollow",
            error: err.message || err,
        });
    }
}

export const getRelationship = async(req: Request, res: Response): Promise<any> => {
    try{
        const { following, follower } = req.body;

        if (!following || !follower) {
            return res.status(400).json({ message: "Both IDs are required" });
        }

        const existingRelation: Partial<FandUF_Interface> | Error_Interface | null = await fetchRelationship(following, follower)

        if(!existingRelation){
            return res.status(200).json({message: 'no_relation'})	
		} else if('error' in existingRelation){
            return res.status(500).json({message: 'Failed to fetch relationship', location: 'account interactions controller [Backend]'})
        }

       res.status(200).json({message: 'relation'})

    }catch (err: any) {
        console.error("Error in getRelationship:", err.name, err.message, err);
        res.status(500).json({
            message: "Error while fetching a relationship",
            error: err.message || err,
        });
    }
}

export const handleLikes = async(req: Request, res: Response): Promise<any> => {
    try{
        const { sentPostId, sentAccountId } = req.body;

        if (!sentAccountId || !sentPostId) {
            return res.status(400).json({ message: "Account ID or post ID is missing" });
        }

        const alreadyLikes = await Interactions.exists({
            postId: sentPostId,
            likes: sentAccountId
        })

        let updatedInteraction

        if(alreadyLikes){
            updatedInteraction = await Interactions.findOneAndUpdate(
                {postId: sentPostId},
                {$pull: {likes: sentAccountId}},
                {new: true}
            )
        }else{
            updatedInteraction = await Interactions.findOneAndUpdate(
                {postId: sentPostId},
                {
                    $addToSet: {likes: sentAccountId},
                    $setOnInsert: {postId: sentPostId}
                },
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            )
        }

        const exsits = await Post.findById(sentPostId)
        if(!exsits?.interactions){
            await Post.findByIdAndUpdate(sentPostId, {
                $set: {interactions: updatedInteraction?._id}
            })
        }


        const io = req.app.get("io")
        io.emit("likeUpdated", {
            postId: sentPostId,
            likes: updatedInteraction?.likes
        })
        return res.status(200).json({message: 'like interaction handled'})

    }catch (err: any) {
        console.error("Error in handling likes:", err.name, err.message, err);
        res.status(500).json({
            message: "Error while handle likes",
            error: err.message || err,
        });
    }
}

export const handleComments = async(req: Request, res: Response): Promise<any> => {
    try{
        const { serviceType, sentAccountId, sentPostId, sentComment, sentCommentId } = req.body;

        if (!serviceType || !sentAccountId || !sentPostId) {
            return res.status(400).json({ message: "Account ID or service type or post ID is missing" });
        }

        let updatedInteraction  

        if(serviceType === 1){ // Add comment
            updatedInteraction = await Interactions.findOneAndUpdate(
                {postId: sentPostId}, 
                {
                    $push: {
                        comments: {
                            account: sentAccountId,
                            comment: sentComment
                        }
                    },
                    $setOnInsert: {postId: sentPostId}
                },
                {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true
                }
            )

            const exsits = await Post.findById(sentPostId)
            if(!exsits?.interactions){
                await Post.findByIdAndUpdate(sentPostId, {
                    $set: {interactions: updatedInteraction?._id}
                })
            }
        }else if(serviceType === 2 && sentCommentId){ // Update Comment
            await Interactions.findOneAndUpdate(
                {
                    postId: sentPostId,
                    "comments.commentId": sentCommentId
                },
                {
                    $set: {"comments.$.comment": sentComment}
                },
                {new: true}
            )
        }else if(serviceType === 3 && sentCommentId){ // Delete Comment
            await Interactions.findOneAndUpdate(
                {postId: sentPostId},
                {
                    $pull: {
                        comments: {commentId: sentCommentId}
                    }
                },
                {new: true}
            )
        }

        const populatedInteraction = await Interactions.findById(
            updatedInteraction?._id
        ).populate("comments.account", "_id userName profilePicture")

        const lastComment = populatedInteraction?.comments[populatedInteraction.comments.length - 1]

        const io = req.app.get("io")
        io.emit("commentUpdated", {
            postId: sentPostId,
            comment: lastComment
        })

       res.status(200).json({message: 'comment interaction handled'})

    }catch (err: any) {
        console.error("Error in handling likes:", err.name, err.message, err);
        res.status(500).json({
            message: "Error while handle likes",
            error: err.message || err,
        });
    }
}