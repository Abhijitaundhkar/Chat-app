import User from "../models/userModel.js"

export const getUserForSidebar=async(req,res)=>{
    try{
        const loggedIdUser=req.user._id
        const allUser=await User.find({_id:{$ne:loggedIdUser}}).select("-password") //$ne not equal and not get password 
        res.status(200).json(allUser)
    }
    catch(error){
        console.log("getUserForSidebar error",err)
        res.status(500).json({error:"Check error "})
    }
    }