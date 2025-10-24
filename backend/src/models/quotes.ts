import mongoose from "mongoose"
import { Quotes_Interface } from "../configs/types_and_interfaces"

//Define Quotes Structure for MongDB
const quotesSchema = new mongoose.Schema<Quotes_Interface>({
    author: {type: String, required: true},
    quote: {type: String, required: true}
})

//Model the structure
const Quotes = mongoose.model<Quotes_Interface>('Quote', quotesSchema)

export default Quotes