import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../models/user";
import express from "express";
const usersRouter = express.Router();

usersRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    const results = await Users.findByUsername(username);
    if (results) {
      return response.status(422).json({ message: "Could not create user, user exists" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await Users.create(username, passwordHash);

    response.status(201).json({ message: "User created successfully" });
  } catch (error) {
    response
      .status(400)
      .json({ error: "Missing username and/or password from body" });
  }
});

// TODO: remove before prod lol
usersRouter.get("/", async (_request: Request, response: Response) => {
  try {
    const users = await Users.find({});
    response.json(users);
  } catch (error) {
    response.status(400).json({ error: "Error fetching users" });
  }
});

export default usersRouter;
