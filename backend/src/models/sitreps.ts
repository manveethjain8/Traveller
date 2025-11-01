import mongoose from "mongoose"
import { Sitrep_Interface } from "../configs/types_and_interfaces";



const sitrepsSchema = new mongoose.Schema<Sitrep_Interface>({
    sitrepImages: {type: [String], default: []},
    description: {type: String, required: false},
    createdAt: {
        type: Date,
        default: Date.now,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }
})

const Sitrep = mongoose.model('Sitrep', sitrepsSchema);
export default Sitrep