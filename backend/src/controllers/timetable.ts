import express from "express";
import axios from "axios";

const timetableRouter = express.Router();

// need to use query because get reqs don't have a body

// by course code, like "5G00EV17-3003"

// to do fix eslint error
timetableRouter.get("/course/", async (req, res, next) => {
  try {
    // authenticate and authorize user before
    const { code } = req.query;

    console.log(code);

    if (!code || typeof code !== "string") {
      res.status(400).send("Course code is required and must be a string.");
      return;
    }

    console.log(process.env.TAMK_API_KEY);

    const apiRes = await axios.post(
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

    console.log(apiRes.data);
    res.send(apiRes.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error. Please try again later.");
    next(error);
  }
});

// by class code, like "21i224"
timetableRouter.get("/class/", (req, res) => {
  // authenticate and authorize user before

  res.send("Timetable :)");
});

export default timetableRouter;
