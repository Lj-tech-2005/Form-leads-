require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const leadrouters = require('./routers/leadsrouters');

const allowedOrigins = ["https://form-leads.vercel.app"];

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

mongoose.connect(process.env.MONGODB_URL, { dbName: "leads" })
    .then(() => {
        console.log("mongodb is connected successfully");
        server.listen(5000, () => {
            console.log("server is running on http://localhost:5000");
        });
    })
    .catch((err) => {
        console.log("mongodb connection error:", err);
    });
