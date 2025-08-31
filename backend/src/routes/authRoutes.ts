import express from 'express'
import { callback_from_google, redirect_to_google } from '../controllers/authController'

const router = express.Router()

// Routes to access the authentication
router.get('/google', redirect_to_google)
router.get('/google/callback', callback_from_google)


export default router