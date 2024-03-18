import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export const loginUser = async (req: Request,res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Incorrect username." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    return res.json( "Login succesful" );
  } catch (error) {
    console.error(error);
    return res.status(500).json( "Internal server error" );
  }
};