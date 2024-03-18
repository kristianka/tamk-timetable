import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import timetableRouter from "./controllers/timetable";
import userRouter from "./routes/userAuth";

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({ secret: "your-secret-key", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
