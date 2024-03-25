import express from "express";
import cors from "cors";
import "dotenv/config";

import timetableRouter from "./controllers/timetable";
import userRouter from "./controllers/user";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/timetables", timetableRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😁`);
});
