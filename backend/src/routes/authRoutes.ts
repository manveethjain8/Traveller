import express from 'express'
import { callback_from_google, logOut, redirect_to_google, refreshAccessToken } from '../controllers/authController'

const router = express.Router()

// Routes to access the authentication
router.get('/google', redirect_to_google)
router.get('/google/callback', callback_from_google)
router.get('/refresh-token', refreshAccessToken)
router.get('/logout', logOut)


export default router