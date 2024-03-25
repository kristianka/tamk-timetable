import { Request, Response, response } from "express";
import bcrypt from "bcrypt";
const loginRouter = require("express").Router();
const usersRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//mock user stuff
const mockUsers = {
  username: "root",
  password: "sekret"
};

usersRouter.post("/", async (request: Request, response: Response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

loginRouter.post('/', async (request: Request, response: Response) => {
  const { username, password } = request.body;

    //mock user stuff
    // Check if the provided username and password match the hardcoded mock user
    if (username === mockUsers.username && password === mockUsers.password) {
      // If credentials match, generate a token
      const token = jwt.sign({ username: mockUsers.username }, process.env.SECRET);
      response.status(200).send({ token, username: mockUsers.username });
  } else {
      // If credentials do not match, return an error
      response.status(401).json({ error: "invalid username or password" });
  }

  
  const user = await User.findOne({ username });
  const passwordCorrect = User === null
    ? false
    : await bcrypt.compare(password, User.passwordHash);

  if (!(User && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password"
    })
  }

  const userForToken = {
    username: User.username,
    id: User._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: User.username, name: User.name });
});

module.exports = { loginRouter, usersRouter, mockUsers };
