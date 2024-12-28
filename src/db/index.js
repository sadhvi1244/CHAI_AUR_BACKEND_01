import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    ); //so we get to know where we connect like in production , development , testing etc
  } catch (error) {
    console.log("MONGODB connection Failed ", error);
    process.exit(1); //node js provide process
  }
};

export default connectDB;
