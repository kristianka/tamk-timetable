import express from "express";

const timetableRouter = express.Router();

timetableRouter.get("/", (req, res) => {
  res.send("Timetable");
});

export default timetableRouter;
