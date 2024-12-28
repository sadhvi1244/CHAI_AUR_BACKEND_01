// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();

// import mongoose, { Mongoose } from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";

// const app = express()(async () => {
//   try {
//     await Mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); //databse connection
//     app.on("error", (error) => {
//       //it listen events
//       console.log("ERRoR: ", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port${process.nv.PORT}`);
//     });
//   } catch (error) {
//     console.error("ERROR: ", error); //console.log bhi likhe to koi dikkat nhi h
//     throw error;
//   }
// })();

// connectDB();
