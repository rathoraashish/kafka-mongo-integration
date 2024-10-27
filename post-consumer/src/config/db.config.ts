import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/posts').then(()=>{
        console.log("Connected to database")
    }).catch((error)=>{
        console.log("Failed to connect to database:", error)
    })
}