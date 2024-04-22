import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../services/register";
import { User } from "../types";

interface RegisterProps {
  user: User | undefined;
}

const RegisterPage = ({ user }: RegisterProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if user is logged in, navigate to home page
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // try catch in service
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    await Register(username, password);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center m-auto">
      <form
        onSubmit={handleRegister}
        className="p-6 bg-white rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
