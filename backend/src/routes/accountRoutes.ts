import express from 'express'
import { authorizeAccount } from '../middlewares/accountMiddlewares';
import { upload } from '../utils/cloudinaryUploadUtils';
import { getAccountInfo, getLimitedAccountInfo, searchAccountByName, updateUserInfo} from '../controllers/accountController';

const router = express.Router()

// Routes to access the account
router.patch('/update-user-account', authorizeAccount, upload.single('profilePicture'), updateUserInfo)
router.get('/fetch-account-details', authorizeAccount, getAccountInfo)
router.get('/fetch-limited-account-details', authorizeAccount, getLimitedAccountInfo)
router.get('/fetch-accounts-by-name/:accountSearchText', authorizeAccount, searchAccountByName)



export default router