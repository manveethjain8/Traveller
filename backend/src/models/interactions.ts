import mongoose from "mongoose"
import { PostInteractions_Interface } from "../configs/types_and_interfaces"


const InteractionsSchema = new mongoose.Schema<PostInteractions_Interface>({
    postId: {type: mongoose.Schema.Types.ObjectId},
    likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
    comments: [{
        account: {type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
        commentId: {type: mongoose.Schema.Types.ObjectId, auto: true},
        comment: {type: String},
        createdAt: { type: Date, default: Date.now }
    }],
})

const Interactions = mongoose.model<PostInteractions_Interface>('Interactions', InteractionsSchema)

export default Interactions