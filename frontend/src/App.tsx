// tailwind
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pingServer } from "./services/info";
import LoginForm from "./services/loginForm";
import RegisterForm from "./services/registerForm";
import Timetable from "./components/Timetable";
import LogoutButton from "./services/logout";

const App = () => {
  // check server status
  useEffect(() => {
    pingServer();
  }, []);

  return (
    <Router>
      <div>
        <ToastContainer />
        <Timetable />
        <LogoutButton/>
      </div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
