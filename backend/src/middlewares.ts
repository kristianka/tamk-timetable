import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types";

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }

  next(error);
};

export { unknownEndpoint, errorHandler };

// validates course/class code that needs to be string.
// sets req.query.code to the code if it's valid.
export const validateQueryCode = (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).send("Course code is required and must be a string.");
  }

  req.query.code = code;
  next();
};

export const validateBodyCode = (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).send("Course code is required and must be a string.");
  }

  req.body.code = code;
  next();
};

export const validateBodyCodes = (req: Request, res: Response, next: NextFunction) => {
  const { codes } = req.body;

  if (!codes || !Array.isArray(codes) || codes.some((code) => typeof code !== "string")) {
    return res.status(400).send("codes is required and must be an array of strings.");
  }

  req.body.courseCodes = codes;
  next();
};

export const getTokenFromReq = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  } else {
    req.token = undefined;
  }
  next();
};

export const getUserFromReq = (req: AuthRequest, _res: Response, next: NextFunction) => {
  if (!req.token) {
    req.user = undefined;
    return next();
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET as string) as JwtPayload;

  if (decodedToken.id) {
    req.user = decodedToken;
  } else {
    req.user = undefined;
  }
  next();
};

export default {
  getTokenFromReq,
  getUserFromReq
};
