const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { connectDB } = require("./config/dbConnect");

// cors config
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
connectDB();
