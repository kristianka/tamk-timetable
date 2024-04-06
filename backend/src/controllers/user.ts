import { Request, Response, response } from "express";
import bcrypt from "bcrypt";
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request: Request, response: Response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

/*usersRouter.get("/", async (_request: Request, response: Response) => {
  const users = await User.find({});
  response.json(users);
});*/

export default usersRouter;
