import { useState } from "react";
import login from "../services/loginForm";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login.login(username, password);
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error(exception);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
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
          className="w-full py-2 px-4 bg-indigo-700 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md focus:outline-none"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;