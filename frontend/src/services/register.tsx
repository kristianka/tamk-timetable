import axios from "axios";
import { toast } from "react-toastify";

export const Register = async (username: string, password: string) => {
  try {
    console.log("Registering user", username, password);
    //post request to register endpoint
    await axios.post("http://localhost:3000/api/users", {
      username,
      password
    });
    toast.success("User registered successfully");
  } catch (error) {
    toast.error("Sorry, something went wrong. Please try again later.");
    console.error("Error registering user", error);
  }
};
