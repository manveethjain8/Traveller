import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares'
import { upload } from '../utils/cloudinaryUploadUtils'
import { uploadSitrep } from '../controllers/sitrepController'


const router = express.Router()

router.post('/add-sitrep', authorizeAccount, upload.any(), uploadSitrep)

export default router