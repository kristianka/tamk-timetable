// @ts-check
import pool from '../db/pool';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
})

const Users = {
  create: async (username: String, password: String) => {

    const User = pool.model("users", userSchema);

    const newUser= new User({
      username,
      password,
    });

    newUser.save();
    console.log(`Created new user for username ${username}`);

  },
  findByUsername: async (username: String) => {


    const User = pool.model("users", userSchema);
    try {
      const user = await User.findOne({ username });

      if (!user) {
        console.log(`No user found for username ${username}`);
        return;
      }

      //console.log(`User for userId ${username}:`, user);
      return user;

    } catch (error) {
        console.error("Error fetching user:", error);
    }
  }
};

export default Users;

//Users.findByUsername("test name");
//Users.create("Test User", "pass");
//Users.findByUsername("Test User");
