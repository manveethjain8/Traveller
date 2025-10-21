import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares';
import { upload } from '../utils/cloudinaryUploadUtils';
import { uploadPost } from '../controllers/postController';

const router = express.Router()

router.post('/upload-post', authorizeAccount, upload.any(), uploadPost)

export default router