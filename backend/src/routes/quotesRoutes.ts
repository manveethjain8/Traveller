import express from 'express'
import { getQuotes } from '../controllers/quotesController'

const router = express.Router()

// Routes to access the quotes
router.get('/single-quote', getQuotes)

export default router