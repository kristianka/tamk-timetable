import "react-toastify/dist/ReactToastify.css";
// tailwind
import "./App.css";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer />
    <App />
  </BrowserRouter>
);
