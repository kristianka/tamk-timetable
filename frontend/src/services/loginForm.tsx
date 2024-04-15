import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => { //login form component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => { //async function to handle form submission
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", { //post request to login endpoint
        username,
        password,
      });

      localStorage.setItem("token", response.data.token); //store token in local storage
      navigate("/"); //home page navigation
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return ( //login form
    <form onSubmit={handleSubmit}> 
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;