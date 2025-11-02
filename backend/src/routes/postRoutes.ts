import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares';
import { upload } from '../utils/cloudinaryUtils';
import { getAllPosts, getSpecificPost, uploadPost } from '../controllers/postController';

const router = express.Router()

router.post('/upload-post', authorizeAccount, upload.any(), uploadPost)
router.get('/all-posts', authorizeAccount, getAllPosts)
router.get('/specific-post/:postId', authorizeAccount, getSpecificPost)

export default router