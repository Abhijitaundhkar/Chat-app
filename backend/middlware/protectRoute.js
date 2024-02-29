import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

const protectRoute= async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"Unauthorized No toke provided"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_key)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized No token"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({error:"Unauthorized No token"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log("protectRoute error",error)
        res.status(500).json({error:"Check error "})
    }
}

export default protectRoute