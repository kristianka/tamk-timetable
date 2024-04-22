import React from "react";
import { useNavigate } from "react-router-dom";

// logout button component
const LogoutButton: React.FC = () => { 
  const navigate = useNavigate();

  // function to handle logout
  const handleLogout = () => { 

    // remove token from local storage
    localStorage.removeItem("token");

    // redirect to login page 
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;