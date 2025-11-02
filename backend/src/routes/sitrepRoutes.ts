import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares'
import { upload } from '../utils/cloudinaryUtils'
import { getAllSitreps, uploadSitrep } from '../controllers/sitrepController'


const router = express.Router()

router.post('/add-sitrep', authorizeAccount, upload.any(), uploadSitrep)
router.get('/all-sitrep', authorizeAccount, getAllSitreps)

export default router