import express from "express";
import axios from "axios";
import { ClassResponse, CourseResponse } from "../../types";

const timetableRouter = express.Router();

// need to use query because get reqs don't have a body

// to do: ratelimit requests

// by course code, like "5G00EV17-3003"
timetableRouter.get("/course/", async (req, res, next) => {
  try {
    // authenticate and authorize user before
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .send("Course code is required and must be a string.");
    }

    const apiRes = await axios.post<CourseResponse>(
      "https://opendata.tamk.fi/r1/reservation/search",
      {
        realization: [code]
      },
      {
        auth: {
          username: process.env.TAMK_API_KEY || "",
          password: ""
        }
      }
    );

    return res.send(apiRes.data);
  } catch (error) {
    res.status(500).send("Internal server error. Please try again later.");
    return next(error);
  }
});

// by class code, like "21i224"
timetableRouter.get("/class/", async (req, res, next) => {
  try {
    // authenticate and authorize user before

    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .send("Course code is required and must be a string.");
    }

    const apiRes = await axios.post<ClassResponse>(
      "https://opendata.tamk.fi/r1/reservation/search",
      {
        studentGroup: [code]
      },
      {
        auth: {
          username: process.env.TAMK_API_KEY || "",
          password: ""
        }
      }
    );

    return res.send(apiRes.data);
  } catch (error) {
    res.status(500).send("Internal server error. Please try again later.");
    return next(error);
  }
});

export default timetableRouter;
