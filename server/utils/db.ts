import mongoose from "mongoose";
import * as  dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => await mongoose.connect(process.env.connection_string as string, {serverSelectionTimeoutMS: 30000}).then(() =>{
    console.log("Connected to MongoDB");
})