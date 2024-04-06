import { Request, Response, response } from "express";
import bcrypt from "bcrypt";
import { Users } from '../models/user';
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request: Request, response: Response) => {
  const { username, password } = request.body

  const user = await Users.findByUsername(username)
  const passwordCorrect = user === null || user === undefined
    ? false
    : await bcrypt.compare(password, user?.password || '')

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username });
})

export default loginRouter;