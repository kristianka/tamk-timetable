import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// register form component
const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // async function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // post request to register endpoint
      await axios.post("http://localhost:3000/api/users", {
        username,
        password,
      });

      alert("User registered successfully");

      // login page navigation
      navigate("/login");
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  // register form
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
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;