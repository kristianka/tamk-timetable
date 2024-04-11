import express from "express";
import { getByClass, getByCourse } from "./timetableRequests";
import {
  validateBodyCode,
  validateQueryCode,
  getUserFromReq
} from "../middlewares";
import TimeTable from "../models/timetable";
import { AuthRequest } from "../../types";

const timetableRouter = express.Router();

// need to use query because get reqs don't have a body
// class codes are validated by middleware validateQueryCode
// to do: ratelimit requests

// get your timetables
timetableRouter.get(
  "/",
  getUserFromReq,
  async (req: AuthRequest, res, next) => {
    try {
      if (!req.user || req.user.id === undefined) {
        return res.status(401).send("Unauthorized");
      }
      const timetables = await TimeTable.getCoursesByUser(req.user.id);

      if (!timetables) {
        return res.status(404).send("No timetables found.");
      }
      return res.send(timetables);
    } catch (error) {
      return next(error);
    }
  }
);

// get timetables from tamk's api by course code, like "5G00EV17-3003"
timetableRouter.get(
  "/course/",
  getUserFromReq,
  validateQueryCode,
  async (req: AuthRequest, res, next) => {
    try {
      if (!req.user || req.user.id === undefined) {
        return res.status(401).send("Unauthorized");
      }
      const apiRes = await getByCourse(req.query.code as string);
      return res.send(apiRes.data);
    } catch (error) {
      return next(error);
    }
  }
);

// get timetables from tamk's api by class code, like "21i224"
timetableRouter.get(
  "/class/",
  getUserFromReq,
  validateQueryCode,
  async (req: AuthRequest, res, next) => {
    try {
      if (!req.user || req.user.id === undefined) {
        return res.status(401).send("Unauthorized");
      }
      // todo: authenticate and authorize user before
      const apiRes = await getByClass(req.query.code as string);
      return res.send(apiRes.data);
    } catch (error) {
      return next(error);
    }
  }
);

// adds a user's new timetable to the database
timetableRouter.post(
  "/",
  getUserFromReq,
  async (req: AuthRequest, res, next) => {
    try {
      const { courseCodes } = req.body;

      if (!req.user || req.user.id === undefined) {
        return res.status(401).send("Unauthorized");
      }
      // to do: check that coursecodes is an array and every value is a string

      // check coursecodes are valid
      for (let i = 0; i < courseCodes.length; i++) {
        const apiRes = await getByCourse(courseCodes[i]);
        if (apiRes.data.message === "No results") {
          return res.status(400).send("Course code is invalid.");
        }
      }

      await TimeTable.updateTimetableByUser(req.user.id, courseCodes);
      return res.send("Timetable added successfully.");
    } catch (error) {
      return next(error);
    }
  }
);

// updates a user's timetable in the database by course code
timetableRouter.put(
  "/",
  validateBodyCode,
  async (req: AuthRequest, res, next) => {
    try {
      const { courseCodes } = req.body;

      if (!req.user || req.user.id === undefined) {
        return res.status(401).send("Unauthorized");
      }

      // to do: check that coursecodes is an array and every value is a string
      // check coursecodes are valid
      for (let i = 0; i < courseCodes.length; i++) {
        const apiRes = await getByCourse(courseCodes[i]);
        if (apiRes.data.message === "No results") {
          return res.status(400).send("Course code is invalid.");
        }
      }

      // update document in db
      await TimeTable.updateTimetableByUser(req.user.id, courseCodes);
      return res.send("Timetable updated successfully.");
    } catch (error) {
      return next(error);
    }
  }
);

export default timetableRouter;
