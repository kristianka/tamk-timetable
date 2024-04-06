import mongoose, { Document } from 'mongoose';
import pool from '../db/pool';

interface UserDocument extends Document {
  id: number;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
});

// Define the user-related functionalities
const Users = {
  create: async (username: string, password: string) => {
    const User = pool.model<UserDocument>("users", userSchema);
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
    console.log(`Created new user for username ${username}`);
  },
  findByUsername: async (username: string) => {
    const User = pool.model<UserDocument>("users", userSchema);
    try {
      const user = await User.findOne({ username });
      if (!user) {
        console.log(`No user found for username ${username}`);
        return;
      }
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
  find: async (query: object) => {
    const User = pool.model<UserDocument>("users", userSchema);
    try {
      const users = await User.find(query);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
};

// Define the Mongoose model for the User collection
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export { Users, UserModel, UserDocument };