import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares';
import { upload } from '../utils/cloudinarySingleFileUtils';
import { getAccountInfo, updateUserInfo } from '../controllers/accountController';

const router = express.Router()

// Routes to access the account
router.put('/update-user-account', authorizeAccount, upload.single('profilePicture'), updateUserInfo)
router.get('/fetch-account-details', authorizeAccount, getAccountInfo)


export default router