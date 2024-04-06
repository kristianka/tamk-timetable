import { Request, Response, response } from "express";
import bcrypt from "bcrypt";
import { Users } from '../models/user';
const usersRouter = require("express").Router();


usersRouter.post("/", async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  await Users.create(username, passwordHash);

  response.json({ message: "User created successfully" });
});

usersRouter.get("/", async (_request: Request, response: Response) => {
  const users = await Users.find({});
  response.json(users);
});

export default usersRouter;
