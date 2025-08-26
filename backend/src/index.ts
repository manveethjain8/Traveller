import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './configs/db'
import session from 'express-session';
import { configurations } from './configs/connections'

import passport from './configs/passport'

import accountRoutes from './routes/accountRoutes'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use(session({
    secret: configurations.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', accountRoutes)

const PORT: number = configurations.PORT
app.listen(PORT, (): void =>{
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 