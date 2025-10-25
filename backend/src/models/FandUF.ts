import mongoose from "mongoose";
import { FandUF_Interface } from "../configs/types_and_interfaces";

const FandUFSchema  = new mongoose.Schema<FandUF_Interface>({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    following: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    createdAt: {type: Date, default: Date.now}
})

// Indexing allows to retrieve the documemts quicker. It also ensures that a user can follow other user once by combining follower and following. It throws an duplicate key error if a user tries to follow the same user more than once
FandUFSchema.index({follower: 1, following: 1}, {unique: true})

const FandUF = mongoose.model<FandUF_Interface>('FandUF', FandUFSchema)

export default FandUF