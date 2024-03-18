import express from "express";
import { getByClass, getByCourse } from "./timetableRequests";
import { validateCode } from "../middlewares";

const timetableRouter = express.Router();

// need to use query because get reqs don't have a body
// class codes are validated by middleware validateCode
// to do: ratelimit requests

// get timetables from tamk's api by course code, like "5G00EV17-3003"
timetableRouter.get("/course/", validateCode, async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    const apiRes = await getByCourse(req.query.code as string);
    return res.send(apiRes.data);
  } catch (error) {
    return next(error);
  }
});

// get timetables from tamk's api by class code, like "21i224"
timetableRouter.get("/class/", validateCode, async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    const apiRes = await getByClass(req.query.code as string);
    return res.send(apiRes.data);
  } catch (error) {
    return next(error);
  }
});

// adds a user's new timetable to the database
timetableRouter.post("/", async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    // save to db
  } catch (error) {
    return next(error);
  }
});

// updates a user's timetable in the database
timetableRouter.put("/", async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    // update document in db
  } catch (error) {
    return next(error);
  }
});

export default timetableRouter;
