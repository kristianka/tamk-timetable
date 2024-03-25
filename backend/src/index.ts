import express from "express";
import cors from "cors";
import "dotenv/config";
import timetableRouter from "./controllers/timetable";
import mongoose from "mongoose";
const { loginRouter, usersRouter } = require("./controllers/user");
const middleware = require('./middleware')
const logger = require('./logger')
mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/timetables", timetableRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😁`);
});