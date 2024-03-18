import express from "express";
import { getByClass, getByCourse } from "./timetableRequests";
import { validateCode } from "../middlewares";

const timetableRouter = express.Router();

// need to use query because get reqs don't have a body
// class codes are validated by middleware validateCode
// to do: ratelimit requests

// by course code, like "5G00EV17-3003"
timetableRouter.get("/course/", validateCode, async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    const apiRes = await getByCourse(req.query.code as string);
    return res.send(apiRes.data);
  } catch (error) {
    return next(error);
  }
});

// by class code, like "21i224"
timetableRouter.get("/class/", validateCode, async (req, res, next) => {
  try {
    // todo: authenticate and authorize user before
    const apiRes = await getByClass(req.query.code as string);
    return res.send(apiRes.data);
  } catch (error) {
    return next(error);
  }
});

export default timetableRouter;
