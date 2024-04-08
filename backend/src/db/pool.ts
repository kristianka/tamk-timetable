import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const pool = mongoose.createConnection(`mongodb://${process.env.MONGO_URL}`, {
  authSource: process.env.MONGO_AUTHSOURCE,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  maxPoolSize: 10
});

export default pool;