import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // ✅ fixed
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

export default app;
