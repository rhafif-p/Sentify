const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // Validate MONGO_URI
    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri, {
      dbName: "senpro",
    });
    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection failed:", error);
    // Use a middleware for error handling
    throw error;
  }
};

// Use a middleware for MongoDB connection error handling
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  throw err;
});

module.exports = { connectDB, uri };
