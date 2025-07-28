import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  //use middleware used to enable CORS and not use aap.get here because we want to use it for all routes
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); //to parse incoming JSON requests with a maximum size of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //to parse incoming requests with URL-encoded payloads, allowing nested objects and limiting the size to 16kb
app.use(express.static("public")); //to serve static files from the "public" directory
app.use(cookieParser()); //to parse cookies attached to the client request object

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

export default app;
