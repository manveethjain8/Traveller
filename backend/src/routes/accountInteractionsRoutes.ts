import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares'
import { getRelationship, handleFollowingAndUnfollowing } from '../controllers/accountInteractionsController'

const router = express.Router()

router.post('/following-unfollowing', authorizeAccount, handleFollowingAndUnfollowing)
router.post('/check-relationship', authorizeAccount, getRelationship)

export default router