import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JwtPayload from "../types/JwtPayload";

const Auth = () => {
  const [myId, setMyId] = useState(-1);
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    Cookies.remove("sessionId");
    Cookies.remove("refresh");
    window.location.reload();
  };

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (sessionId) {
      const payload = jwtDecode<JwtPayload>(sessionId);
      setMyId(parseInt(payload.user_id));
    }
  }, []);

  return (
    <div>
      {myId === -1 ? (
        <div>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleRegister()}
          >
            Register
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleLogin()}
          >
            Login
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Auth;
