import mongoose, { Document } from "mongoose";
import pool from "../db/pool";


interface UserDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});


// Define the user-related functionalities
const Users = {
  create: async (username: string, password: string) => {
    const User = pool.model<UserDocument>("users", userSchema);
    const newUser = new User({
      username,
      password
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
  findById: async (id: string) => {
    const User = pool.model<UserDocument>("users", userSchema);
    try {
      const user = await User.findOne({_id: id});
      if (!user) {
        console.log(`No user found for id ${id}`);
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
  deleteUserById: async (id: string) => {
    const User = pool.model<UserDocument>("users", userSchema);
    try {
      const result = await User.deleteOne({_id: id});
      return result;
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

// Define the Mongoose model for the User collection
const UserModel = mongoose.model<UserDocument>("User", userSchema);

export { Users, UserModel, UserDocument };
