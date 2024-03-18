import { Request, Response, NextFunction } from "express";

// validates course/class code that needs to be string.
// sets req.query.code to the code if it's valid.
export const validateQueryCode = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res
      .status(400)
      .send("Course code is required and must be a string.");
  }

  req.query.code = code;
  next();
};

export const validateBodyCode = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res
      .status(400)
      .send("Course code is required and must be a string.");
  }

  req.body.code = code;
  next();
};

// error handler
// to do: implement better error handling
export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err);
  return res.status(500).send("Internal server error. Please try again later.");
};
