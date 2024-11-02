import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JwtPayload from "../types/JwtPayload";
import { PrimaryButton, SecondaryButton } from "./Buttons";

const Auth = () => {
  const [myId, setMyId] = useState(-1);
  const navigate = useNavigate();

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
          <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
        </div>
      ) : (
        <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
      )}
    </div>
  );
};

export default Auth;
