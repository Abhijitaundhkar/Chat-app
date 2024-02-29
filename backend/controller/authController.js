import User from "../models/userModel.js"
import bcryptjs from 'bcryptjs'
import generateWebToken from "../utlis/token.js"

export const signUpUser=async(req,res)=>{
    try{
        const {fullName,userName,password,confirmPassword,gender,profilePic}=req.body
        if(password !==confirmPassword){
            return res.status(400).json({error:"password is not match"})
        }
        const user=await User.findOne({userName})
        if(user){
            return res.status(400).json({error:"userName is already exists"})
        }

        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`

        const salt=await bcryptjs.genSalt(10)
        const hashPassWord=await bcryptjs.hash(password,salt)

        const newUser=new User({
            fullName,
            userName,
            password:hashPassWord,
            gender,
            profilePic:gender==="male"? boyProfilePic:girlProfilePic
        })
        if(newUser){
        generateWebToken(newUser._id,res)
        await newUser.save()
        res.status(201).json(newUser)
        }

    }
    catch(err){
        console.log("signup error",err)
        res.status(500).json({error:"Check error "})
    }
}

export const logInUser=async(req,res)=>{
    try {
        const {userName,password}=req.body
    const user=await User.findOne({userName})
    const isPasswordCorrect=await bcryptjs.compare(password,user?.password|| " ")
    if(!user ||!isPasswordCorrect){
        return res.status(400).json({error:"invalid user name or password"})
    }
    generateWebToken(user._id,res)
    res.status(201).json("login sucesfull")


    } 
    catch (error) {
        console.log("login error",error)
        res.status(500).json({error:"Check error "})
    }
    
}

export const logOutUser=async(req,res)=>{
    try {
        res.cookie('jwt',"",{maxAge:0})
        res.status(200).json({message:"log out sucessfully"})
    } 
    catch (error) {
        console.log("logout error",error)
        res.status(500).json({error:"Check error "})
    }
}