import express from "express";
import { getByClass, getByCourse } from "./timetableRequests";
import { validateBodyCode, validateQueryCode } from "../middlewares";

const timetableRouter = express.Router();

// need to use query because get reqs don't have a body
// class codes are validated by middleware validateQueryCode
// to do: ratelimit requests

// get timetables from tamk's api by course code, like "5G00EV17-3003"
timetableRouter.get("/course/", validateQueryCode, async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    const apiRes = await getByCourse(req.query.code as string);
    return res.send(apiRes.data);
  } catch (error) {
    return next(error);
  }
});

// get timetables from tamk's api by class code, like "21i224"
timetableRouter.get("/class/", validateQueryCode, async (req, res, next) => {
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
    const { courseCodes } = req.body;

    // to do: check that coursecodes is an array and every value is a string

    // check coursecodes are valid
    for (let i = 0; i < courseCodes.length; i++) {
      const apiRes = await getByCourse(courseCodes[i]);
      if (apiRes.data.message === "No results") {
        return res.status(400).send("Course code is invalid.");
      }
    }

    // todo: authenticate and authorize user before
  } catch (error) {
    return next(error);
  }
});

// updates a user's timetable in the database by course code
timetableRouter.put("/", validateBodyCode, async (req, res, next) => {
  try {
    const { courseCodes } = req.body;
    // todo: authenticate and authorize user before

    // user sends their timetable id and new course codes.
    // need to check that user has access to the timetable id
    // and that the course codes are valid.

    // to do: check that coursecodes is an array and every value is a string
    // check coursecodes are valid
    for (let i = 0; i < courseCodes.length; i++) {
      const apiRes = await getByCourse(courseCodes[i]);
      if (apiRes.data.message === "No results") {
        return res.status(400).send("Course code is invalid.");
      }
    }

    // update document in db
  } catch (error) {
    return next(error);
  }
});

export default timetableRouter;
