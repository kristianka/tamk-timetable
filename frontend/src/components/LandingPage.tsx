import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full">
      <h1>Welcome to timetable app! To continue, please login or register.</h1>

      <button
        type="button"
        className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        type="button"
        className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default LandingPage;
