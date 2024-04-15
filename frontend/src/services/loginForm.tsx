import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  setUser: (user: string) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    //async function to handle form submission
    event.preventDefault();

    try {
      //post request to login endpoint
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password
      });

      localStorage.setItem("token", response.data.token);
      console.log("Logged in, token", response.data.token);
      // set user in App component so app can re-render
      props.setUser(response.data.token);
      //home page navigation
      navigate("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    //login form
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
};

export default LoginForm;
