import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//login form component
const LoginForm: React.FC = () => { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //async function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      //post request to login endpoint
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      //store token into local storage
      localStorage.setItem("token", response.data.token);
      
      //home page navigation
      navigate("/"); 
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  //login form
  return (
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