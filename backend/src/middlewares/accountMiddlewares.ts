import { Request, Response ,NextFunction } from "express";
import { verifyAccessToken } from "../utils/accountUtils";
import { TokenPayload_Interface } from "../configs/types_and_interfaces";

export const authorizeAccount = (req: Request, res: Response, next: NextFunction): any => {
    try{
        const token: string = req.cookies.accessToken


        if(!token){
            return res.status(401).json({message: 'Access token expired or missing'})
        }

        const decoded: TokenPayload_Interface = verifyAccessToken(token)
        

        if(!decoded){
            return res.status(401).json({ message: 'Invalid Access token' })
        }

        console.log('Access token verified for user:', decoded.mongoDbId)

        req.user = {
            mongoDbId: decoded.mongoDbId,
            googleId: decoded.googleId
        }
        next()
    }catch(err){
        return res.status(401).json({ message: 'Invalid or expired token', location: 'accountMiddleware [middlewares]' });
    }
}