import express from "express";

const infoRouter = express.Router();

infoRouter.get("/health", async (req, res, next) => {
  try {
    res.send("ok");
  } catch (error) {
    return next(error);
  }
});

export default infoRouter;
