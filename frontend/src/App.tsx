import { useEffect } from "react";
import "./App.css";
import Timetable from "./components/Timetable";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pingServer } from "./services/info";

const App = () => {
  // check server status
  useEffect(() => {
    pingServer();
  }, []);

  return (
    <div>
      <ToastContainer />
      <Timetable />
    </div>
  );
};

export default App;
