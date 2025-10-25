import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares'
import { handleFollowingAndUnfollowing } from '../controllers/accountInteractions'

const router = express.Router()

router.post('/following-unfollowing', authorizeAccount, handleFollowingAndUnfollowing)

export default router