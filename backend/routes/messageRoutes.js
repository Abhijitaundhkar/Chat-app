import express from 'express'
import { sendMessage ,getMessage} from '../controller/messageController.js'
import protectRoute from '../middlware/protectRoute.js'
const router=express.Router()

router.get("/:id",protectRoute,getMessage)
router.post("/send/:id",protectRoute,sendMessage)

export default router