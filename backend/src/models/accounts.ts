import mongoose from "mongoose"
import { Account_Interface} from "../configs/types_and_interfaces"

//Define Account Structure for MongDB
const accountSchema = new mongoose.Schema<Account_Interface>({
    googleId: {type: String, required: true, unique: true},
    displayName: {type: String, required: true},
    email: {type: String, required: true}
})

//Model the structure
const Account = mongoose.model<Account_Interface>('accounts', accountSchema)

export default Account
