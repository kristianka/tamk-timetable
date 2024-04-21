import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

interface RegisterFormProps {
  user: User | undefined;
}

const RegisterForm = (props: RegisterFormProps) => {
  //register form component
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if user is logged in, navigate to home page
    if (props.user) {
      navigate("/");
    }
  }, [props.user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    //async function to handle form submission
    event.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/users", {
        //post request to register endpoint
        username,
        password
      });

      alert("User registered successfully");
      navigate("/login"); //login page navigation
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    //register form
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
};

export default RegisterForm;
