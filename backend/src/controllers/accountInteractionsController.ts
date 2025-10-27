import { Request, Response } from "express"
import FandUF from "../models/FandUF"

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