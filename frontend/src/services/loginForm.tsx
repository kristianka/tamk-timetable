import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

interface LoginFormProps {
  user: User | undefined;
  setUser: (user: User) => void;
}

const LoginForm = (props: LoginFormProps) => {
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
      props.setUser(user);

      //home page navigation
      navigate("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

export default { login };