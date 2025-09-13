import mongoose from "mongoose";
import { AccountInteraction_Interface } from "../configs/types_and_interfaces";

const accountInteractionSchema  = new mongoose.Schema<AccountInteraction_Interface>({
    followers: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    followings: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true},
    createdAt: {type: Date, default: Date.now}
})

// Indexing allows to retrieve the documemts quicker. It also ensures that a user can follow other user once by combining follower and following. It throws an duplicate key error if a user tries to follow the same user more than once
accountInteractionSchema.index({followers: 1, followings: 1}, {unique: true})

const AccountInteraction = mongoose.model<AccountInteraction_Interface>('accountInteractions', accountInteractionSchema)

export default AccountInteraction