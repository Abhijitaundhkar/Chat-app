import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import messagesRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import  connectDb from './db/connection.js'
import cookieParser from 'cookie-parser'

const app=express()
const port=process.env.PORT||3000

dotenv.config()
app.use(express.json())
app.use(cookieParser())
// app.get('/',(req,res)=>{
//     res.send("server running !!")
// })
app.use('/api/auth',authRoutes)
app.use('/api/messages',messagesRoutes)
app.use('/api/users',userRoutes)
connectDb()
app.listen(port,()=>{
    
    console.log(`server running on port http://localhost:${port}`)
})


