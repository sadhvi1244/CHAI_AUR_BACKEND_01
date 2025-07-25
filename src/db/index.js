import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`  //connectionInstance.connection.host gives the host name of the database connection because we can connect to different databases in different environments (development, production, testing, etc.
    ); //so we get to know where we connect like in production , development , testing etc
  } catch (error) {
    console.log("MONGODB connection Failed ", error);
    process.exit(1); //node js provide process  //we can also throw error but process.exit(1) is better as it stops the process
  }
};

export default connectDB;
