import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

// Mock user data (replace with your actual data)
const mockUsers = [
  { id: "1", username: "user1", password: "$2b$10$KQ7AbYdRCumowNfQChI3ieIOsDEPBsPzW6U92Nq3my/1SH0f3cYFy" }, // password is 'password1'
  { id: "2", username: "user2", password: "$2b$10$KQ7AbYdRCumowNfQChI3ieIOsDEPBsPzW6U92Nq3my/1SH0f3cYFy" }  // password is 'password2'
];

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