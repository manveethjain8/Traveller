import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './configs/db'
import { configurations } from './configs/connections'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

const PORT: number = configurations.PORT
app.listen(PORT, (): void =>{
    console.log(`✅ Server running at http://localhost:${PORT}`)
}) 