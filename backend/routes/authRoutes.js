import express from 'express'
import  {logOutUser,logInUser,signUpUser} from '../controller/authController.js'
const router=express.Router()

router.post('/signup',signUpUser)
router.post('/login',logInUser)
router.post('/logout',logOutUser)

export default router