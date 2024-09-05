import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const Connection = () =>{
    const db = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.PASSWORD);

    mongoose.connect(db).then(()=>{
        console.log("Database Connected");
    })
}

export default Connection