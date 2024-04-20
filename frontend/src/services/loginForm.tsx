import axios from "axios";

const login = async (username: string, password: string) => {
  try {
    // post request to login endpoint
    const response = await axios.post("http://localhost:3000/api/login", {
      username,
      password
    });

    localStorage.setItem("token", response.data.token);
    console.log("Logged in, token", response.data.token);
  } catch (error) {
    console.error("Error logging in", error);
  }
};

export default { login };