import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares';
import { upload } from '../utils/cloudinarySingleFileUtils';
import { updateUserInfo } from '../controllers/accountController';

const router = express.Router()

// Routes to access the account
router.put('/update-user-account', authorizeAccount, upload.single('profilePicture'), updateUserInfo);


export default router