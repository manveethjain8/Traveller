import mongoose from "mongoose"
import { Sitrep_Interface } from "../configs/types_and_interfaces";

const sitrepsSchema = new mongoose.Schema<Sitrep_Interface>({
    sitrepImages: {type: [
        {
            url: {type: String, required: true},
            public_id: {type: String, required: true}
        }
    ], default: []},
    description: {type: String, required: false},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }]
})

sitrepsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })

const Sitrep = mongoose.model('Sitrep', sitrepsSchema);
export default Sitrep