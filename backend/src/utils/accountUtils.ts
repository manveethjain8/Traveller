import jwt from 'jsonwebtoken'
import { TokenPayload_Interface } from '../configs/types_and_interfaces'
import { configurations } from '../configs/connections'


// Generates JWT Access Token
export const generateAccessToken = (payload: TokenPayload_Interface): string => {
    return jwt.sign(payload, configurations.ACCESS_TOKEN_SECRET, {expiresIn: '1min'})
}


// Generates JWT Refresh Token
export const generateRefreshToken = (payload: TokenPayload_Interface): string => {
    return jwt.sign(payload, configurations.REFRESH_TOKEN_SECRET, {expiresIn: '30min'})
}

// Verifies JWT Access Token
export const verifyAccessToken = (payload: string): TokenPayload_Interface => {
    return jwt.verify(payload, configurations.ACCESS_TOKEN_SECRET) as TokenPayload_Interface
}

// Verifies JWT Refresh Token
export const verifyRefreshToken = (payload: string): TokenPayload_Interface => {
    return jwt.verify(payload, configurations.REFRESH_TOKEN_SECRET) as TokenPayload_Interface
}