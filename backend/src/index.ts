import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './configs/db'
import session from 'express-session';
import { configurations } from './configs/connections'

import passport from './configs/passport'

import accountRoutes from './routes/accountRoutes'

//Provides access to ENV'S
dotenv.config()

//Fuction Call to connect to MongoDB
connectDB()

//Define the app
const app = express()

//Enables the app to use JSON format
app.use(express.json())

//Enables the frontend to talk to backend
app.use(cors())

//Enables the app to use session storage for OAuth2
app.use(session({
    secret: configurations.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Enables the app to use the routes
app.use('/auth', accountRoutes)

//Provides the means to connect to the server
const PORT: number = configurations.PORT
app.listen(PORT, (): void =>{
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 