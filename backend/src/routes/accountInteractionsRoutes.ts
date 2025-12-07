import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares'
import { getRelationship, handleComments, handleFollowingAndUnfollowing, handleLikes } from '../controllers/accountInteractionsController'

const router = express.Router()

router.post('/following-unfollowing', authorizeAccount, handleFollowingAndUnfollowing)
router.post('/check-relationship', authorizeAccount, getRelationship)
router.post('/likes', authorizeAccount, handleLikes)
router.post('/comments', authorizeAccount, handleComments)

export default router