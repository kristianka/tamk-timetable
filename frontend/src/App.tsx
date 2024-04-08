import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import getData from "./services/timetable";
import LoginForm from "./services/loginForm";
import RegisterForm from "./services/registerForm";

function App() {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setData(res);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
