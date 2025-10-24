import mongoose from "mongoose"
import { Account_Interface} from "../configs/types_and_interfaces"

//Define Account Structure for MongDB
const accountSchema = new mongoose.Schema<Account_Interface>({
    googleId: {type: String, required: true, unique: true},
    displayName: {type: String, required: true},
    email: {type: String, required: true},
    profilePicture: {type: String},
    profilePictureId: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String, unique: true},
    tagline: {type: String},
    district: {type: String},
    state: {type: String},
    country: {type: String},
    gender: {type: String},
    date_of_birth: {type: String},
    tags: {type: []},
    createdAt: {type:Date, default: Date.now}
})

//Model the structure
const Account = mongoose.model<Account_Interface>('Account', accountSchema)

export default Account
