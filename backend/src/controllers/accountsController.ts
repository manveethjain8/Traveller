import { Response, Request, NextFunction } from "express"
import passport from "passport"
import { AuthenticatedRequestInterface } from "../configs/types_and_interfaces";

export const redirect_to_google = await passport.authenticate('google', {
    scope: ['profile', 'email']
})

export const callback_from_google = [passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/home'
    }),
    (req: AuthenticatedRequestInterface, res: Response) => {
        try{
            console.log("Login Successfull")
        }catch(err: unknown){
            if(err instanceof Error){
                res.status(500).json({message: 'Error logging in from Google', error: err.message})
            }else{
                res.status(500).json({message: 'Unknown Error while logging in from Google'})
            }
        }
    }
]