import express from "express";
import cors from "cors";
import "dotenv/config";
import timetableRouter from "./controllers/timetable";
import infoRouter from "./controllers/info";

import mongoose from "mongoose";
import usersRouter from "./controllers/user";
import loginRouter from "./controllers/login";
import { getTokenFromReq, errorHandler, unknownEndpoint } from "./middlewares";
mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use(getTokenFromReq);
app.use("/api/timetables", timetableRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/info", infoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😁`);
});

export default app;
