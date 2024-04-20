// /components/RegisterPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../services/registerForm";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await register.register(username, password);
      alert("User registered successfully");
      navigate("/login");
    } catch (exception) {
      console.error("Error registering user", exception);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleRegister} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-700 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;