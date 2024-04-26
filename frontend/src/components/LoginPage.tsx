import { useEffect, useState } from "react";
import { Login } from "../services/login";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";
import { setToken } from "../services/timetableService";

interface LoginProps {
  user: User | undefined;
  setUser: (user: User) => void;
}

const LoginPage = ({ user, setUser }: LoginProps) => {
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
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = await Login(username, password);
    if (!user) {
      return;
    }
    setUsername("");
    setPassword("");
    setToken(user.token);
    setUser(user);
  };

  return (
    <div className="m-auto flex items-center justify-center">
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
          className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Log in
        </button>
        <p className="mt-4 text-center">
          Don't have an account yet?{" "}
          <Link className="text-indigo-700" to="/register">
            Register here.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
