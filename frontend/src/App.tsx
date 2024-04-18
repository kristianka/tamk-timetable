// tailwind
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pingServer } from "./services/info";
import LoginForm from "./services/loginForm";
import RegisterForm from "./services/registerForm";
import Timetable from "./components/Timetable";
import LandingPage from "./components/LandingPage";
import { User } from "./types";

const App = () => {
  const [user, setUser] = useState<User>();

  // check server status, check if token exists
  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("user") || "{}") as User;
    console.log(cachedUser);
    if (cachedUser && cachedUser.validUntil > new Date().getTime()) {
      setUser(cachedUser);
    } else {
      console.log("Token expired or no user in local storage");
      localStorage.removeItem("user");
    }
    pingServer();
  }, []);

  console.log("user", user);
  // if user isn't logged in, show landing page
  return (
    <Router>
      <div>
        <ToastContainer />
        {user ? <Timetable /> : <LandingPage />}
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
