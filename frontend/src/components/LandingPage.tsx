import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="m-auto">
      <h1 className="font-bold text-4xl">Welcome to timetable app!</h1>
      <h2 className="text-xl">To continue, please login or register below.</h2>

      <div className="grid grid-cols-2 m-5">
        <button
          type="button"
          className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          type="button"
          className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
