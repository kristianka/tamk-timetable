import express from "express";
import cors from "cors";

import timetableRouter from "./controllers/timetable";

const loginRouter = require("./controllers/user");
const usersRouter = require("./controllers/user");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/timetables", timetableRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😁`);
});
