import express from "express";
import passport from "passport";
import { loginUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.post("/login", passport.authenticate("local"), loginUser);

export default userRouter;
