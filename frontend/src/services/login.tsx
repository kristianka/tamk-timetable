import axios from "axios";
import { toast } from "react-toastify";

export const Login = async (username: string, password: string) => {
  try {
    //post request to login endpoint
    const response = await axios.post("http://localhost:3000/api/login", {
      username,
      password
    });

    // set user in App component so app can re-render
    const token = response.data.token;
    const user = {
      username: username,
      token: token,
      validUntil: new Date().getTime() + 1000 * 60 * 60
    };
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Logged in, token", user.token);
    toast.success("Logged in successfully!");
    return user;
  } catch (error) {
    toast.error("Invalid credentials. Please try again.");
    console.error("Error logging in", error);
  }
};
