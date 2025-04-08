import mongoose from "mongoose";
import * as  dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.connection_string as string).then(() =>{
    console.log("Connected to MongoDB");
})