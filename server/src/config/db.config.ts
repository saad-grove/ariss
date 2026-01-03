import mongoose from "mongoose";
import { env } from "./env.config";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI!);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}