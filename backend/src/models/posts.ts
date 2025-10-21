import mongoose from "mongoose"
import { Posts_Interface } from "../configs/types_and_interfaces"

const postsSchema = new mongoose.Schema<Posts_Interface>({
    thumbnail: {type: String, required: true},
    expeditionName: {type: String, required: true},
    date: {type: String, required: true},
    introduction: {type: String, required: true},
    days: {type: Number, required: true},
    totalDistance: {type: Number, required: true},
    expenses: {type: Number, required: true},
    amenities: {type: String, required: true},
    season: {type: String, required: true},
    environment: {type: String, required: true},
    transport: {type: String, required: true},
    landscape: {type: String, required: true},
    difficulty: {type: String, required: true},
    location: {type: String, required: true},
    footfall: {type: String, required: true},
    healthRisks: {type: String, required: true},
    description: {type: String || null, required: false, default: null},

    legs: [{
        startPhoto: {type: String || null, default: null},
        legIntroduction: {type: String || null, default: null},
        startDate: {type: String || null, default: null},
        legDistance: {type: Number || null, default: null},
        enviroment: {type: String || null, default: null},
        landscape: {type: String || null, default: null},
        weather: {type: String || null, default: null},
        location: {type: String || null, default: null},
        highlights: {type: String || null, default: null},
        challenges: {type: String || null, default: null},
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
        conclusion: {type: String || null, default: null},
        startTime: {type: String || null, default: null},
        endTime: {type: String || null, default: null},
        difficulty: {type: String || null, default: null},
        expenses: {type: String || null, default: null},
        traffic: {type: String || null, default: null},
        roadConditions: {type: String || null, default: null},
        endPhoto: {type: String || null, default: null},
        notes: {type: String || null, default: null},
        photoDump: {type: [String], default: []},
    }],

    createdAt: {
        type: Date,
        default: Date.now,
    },

    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }
})

const Post = mongoose.model('Post', postsSchema);
export default Post