import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
 
const URL = process.env.MONGODB_URI;

async function db() {
  try {
    await mongoose.connect(URL);
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
}

export default db;
