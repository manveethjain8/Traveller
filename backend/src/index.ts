import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './configs/db'
import session from 'express-session'
import { configurations } from './configs/connections'

import passport from './utils/passportUtils'

import authRoutes from './routes/authRoutes'
import accountRoutes from './routes/accountRoutes'
import quoteRoutes from './routes/quotesRoutes'
import postRoutes from './routes/postRoutes'
import accountInteractionRoutes from './routes/accountInteractionsRoutes'
import sitrepRoutes from './routes/sitrepRoutes'

//Provides access to ENV'S
dotenv.config()

//Fuction Call to connect to MongoDB
connectDB()

//Define the app
const app = express()

//Enables the app to use JSON format
app.use(express.json())

//Enables the frontend to talk to backend
//Enables security with JWT
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())

//Enables the app to use session storage for OAuth2
app.use(session({
    secret: configurations.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Enables the app to use the routes
app.use('/auth', authRoutes)
app.use('/account', accountRoutes)
app.use('/quote', quoteRoutes)
app.use('/post', postRoutes)
app.use('/interaction', accountInteractionRoutes)
app.use('/sitrep', sitrepRoutes)

//Provides the means to connect to the server
const PORT: number = configurations.PORT
app.listen(PORT, (): void =>{
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 