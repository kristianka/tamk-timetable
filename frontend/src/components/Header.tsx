import { toast } from "react-toastify";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: User | undefined;
}

const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  const logOut = () => {
    // verify
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("user");
      toast.success("Logged out successfully. See you later!");
      window.location.reload();
    }
  };

  const logIn = () => {
    navigate("/login");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white footer bg-slate-50">
      <div className="w-full max-w-screen-xl mx-auto p-1">
        <div className="sm:flex sm:items-center sm:justify-between">
          <button
            onClick={navigateToHome}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://www.svgrepo.com/show/35457/calendar-symbol.svg"
              className="h-10"
              alt="Calendar icon"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Timetable app
            </span>
          </button>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <a
                target="_blank"
                href="https://github.com/kristianka/tamk-timetable"
                className="hover:underline"
              >
                Source code
              </a>
            </li>
            {user ? (
              <button
                onClick={logOut}
                id = "signOut"
                className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={logIn}
                className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Sign in
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
