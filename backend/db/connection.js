import mongoose from 'mongoose'

const connectToDb=async ()=>{
    try {
            const connect=await mongoose.connect(process.env.mongoDb_URI)
            console.log(`Database Connnected ${connect.connection.host}`)
    } catch (error) {
        console.log("error connecting to MongoDb",error.message)
    }
}

export default connectToDb