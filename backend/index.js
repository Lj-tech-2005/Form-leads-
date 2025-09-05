import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import leadrouters from "./routers/leadsrouters.js";

dotenv.config();

const server = express();

const allowedOrigins = ["http://localhost:5173"];

server.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/leads", leadrouters);

mongoose
  .connect(process.env.MONGODB_URL, { dbName: "leads" })
  .then(() => {
    console.log("mongodb is connected successfully");
    server.listen(5000, () => {
      console.log("server is running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.log("mongodb connection error:", err);
  });
