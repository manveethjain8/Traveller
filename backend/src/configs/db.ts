import mongoose from 'mongoose'
import { configurations } from './connections'

const connectDB = async(): Promise<void> => {
    try{
        await mongoose.connect(configurations.MONGO_URI)
        console.log("Successfully connected to Mongo DB")
    }catch(err: unknown){
        if(err instanceof Error){
            console.error("Error connecting to Mongo DB")
        }else{
            console.error("Unkown error occured while connection to Mongo DB")
        }
        process.exit(1)
    }
}

export default connectDB