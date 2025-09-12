import { Response, Request, NextFunction } from "express"
import passport from "passport"
import { AuthenticatedRequestInterface, TokenPayload_Interface } from "../configs/types_and_interfaces";
import { generateAccessToken, generateRefreshToken } from "../utils/accountUtils";

// Redirects the user to google
export const redirect_to_google = await passport.authenticate('google', {
    scope: ['profile', 'email']
})

// Receives the call back from google and decides what to do based on the received result
export const callback_from_google = [passport.authenticate('google', {
        failureRedirect: '/',
    }),
    (req: AuthenticatedRequestInterface, res: Response) => {
        try{
            const payload: TokenPayload_Interface = {
                mongoDbId: String(req.user._id),
                googleId: req.user.googleId
            }

            const accessToken: string = generateAccessToken(payload)
            const refreshToken: string = generateRefreshToken(payload)

            if(!accessToken || !refreshToken){
                res.status(500).json({message: 'Failed to generate tokens', location: 'accounts controller [Backend]'})
                res.redirect('http://localhost:5173/')
            }

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 1 * 60 * 1000
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 30 * 60 * 1000
            })

            res.redirect('http://localhost:5173/home')
        }catch(err: unknown){
            if(err instanceof Error){
                res.status(500).json({message: 'Error logging in from Google', error: err.message})
            }else{
                res.status(500).json({message: 'Unknown Error while logging in from Google'})
            }
        }
    }
]

export const refreshAccessToken = async(req: Request, res: Response): Promise<any> => {
    try{}catch(err){
        if(err instanceof Error){
            res.status(500).json({message: 'Error refreshing tokens', error: err.message, location: 'accounts controller [Backend]'})
        }else{
            res.status(500).json({message: 'Unknown Error', location: 'accounts controller [Backend]'})
        }
    }
}