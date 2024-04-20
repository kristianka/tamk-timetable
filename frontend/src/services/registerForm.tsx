import axios from "axios";

const register = async (username, password) => {
  try {
    // post request to register endpoint
    await axios.post("http://localhost:3000/api/users", {
      username,
      password,
    });
  } catch (error) {
    console.error("Error registering user", error);
  }
};

export default { register };