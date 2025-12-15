import mongoose from "mongoose"
import { Posts_Interface } from "../configs/types_and_interfaces"


const postsSchema = new mongoose.Schema<Posts_Interface>({
    thumbnail: {type: String, required: true},
    expeditionName: {type: String, required: true},
    date: {type: String, required: true},
    tags: {type: String, required: true},
    days: {type: Number, required: true},
    totalDistance: {type: Number, required: true},
    expenses: {type: Number, required: true},
    amenities: {type: String, required: true},
    season: {type: String, required: true},
    environment: {type: String, required: true},
    transport: {type: String, required: true},
    landscape: {type: String, required: true},
    difficulty: {type: String, required: true},
    locationString: {type: String, required: true},
    footfall: {type: String, required: true},
    dangers: {type: String, required: true},
    description: {type: String || null, required: false, default: null},
    domainString: {type: String || null, required: true, default: 'public'},
    embedding: {type: [Number], required: true, default: []},

    legs: [{
        startPhoto: {type: String || null, default: null},
        legDescription: {type: String || null, default: null},
        restaurants: {
            availability: {type: String || null, default: null},
            recommendation: {type: String || null, default: null}
        },
        fuelAndServices: {
            availability: {type: String || null, default: null},
            recommendation: {type: String || null, default: null}
        },
        stays: {
            availability: {type: String || null, default: null},
            recommendation: {type: String || null, default: null}
        },
        network: {
            availability: {type: String || null, default: null},
            recommendation: {type: String || null, default: null}
        },
        endPhoto: {type: String || null, default: null},
        notes: {type: String || null, default: null},
        photoDump: {type: [String], default: []},
    }],

    createdAt: {
        type: Date,
        default: Date.now,
    },

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },

    interactions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interactions",
    }
})

const Post = mongoose.model('Post', postsSchema);
export default Post