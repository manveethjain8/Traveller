import passport from "passport"
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20"
import { HydratedDocument } from "mongoose"
import dotenv from 'dotenv'
import { configurations } from "../configs/connections"
import { Account_Interface } from "../configs/types_and_interfaces"
import Account from "../models/accounts"

dotenv.config() // Enables Environmental Variables


// Redefined the passport with my custom routes and requirements
passport.use(
    new GoogleStrategy({
        clientID: configurations.GOOGLE_CLIENT_ID,
        clientSecret: configurations.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(accessToken, refreshToken, profile: Profile, done): Promise<any> => {
        try{
            let account: HydratedDocument<Account_Interface> | null = await Account.findOne({googleId: profile.id})

            if(!account){
                account = new Account ({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails?.[0].value
                })

                await account.save()
            }

            done(null, account || false)
        }catch(err: unknown){
            done(err as Error, undefined)
        }
    }
))


// Saves only MongoDB ID in session storage after successfull login
passport.serializeUser((account, done) => {
    done(null, (account as HydratedDocument<Account_Interface>)._id)
})


// Stores the entire account details in req.account. Will be used on protected routes
passport.deserializeUser(async(id: string, done) => {
    try{
        const account = await Account.findById(id)
        done(null, account)
    }catch(err){
        done(err as Error, undefined)
    }
})

export default passport