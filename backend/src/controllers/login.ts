import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/user";
import express from "express";
import jwt from "jsonwebtoken";
const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    const user = await Users.findByUsername(username);
    const passwordCorrect =
      user === null || user === undefined
        ? false
        : await bcrypt.compare(password, user?.password || "");

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password"
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET as string);

    response.status(200).send({ token, username: user.username });
  } catch (error) {
    response
      .status(400)
      .json({ error: "Missing username and/or password from body" });
  }
});

export default loginRouter;
