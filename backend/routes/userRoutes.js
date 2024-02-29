import express from 'express'
import protectRoute from '../middlware/protectRoute.js'
import { getUserForSidebar } from '../controller/userController.js'
const router=express.Router()

router.get('/',protectRoute,getUserForSidebar)
// router.post('/login',logInUser)
// router.post('/logout',logOutUser)

export default router