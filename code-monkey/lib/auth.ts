import { jwtDecode } from "jwt-decode";
import JwtPayload from "@/types/JwtPayload";
import Cookies from "js-cookie";

export const getCurrUserInfo = () => {
  const sessionId = Cookies.get("sessionId");
  if (!sessionId) return undefined;
  try {
    const payload = jwtDecode<JwtPayload>(sessionId);
    return { username: payload.username, userId: parseInt(payload.user_id) };
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return undefined;
  }
};

export const checkIsLoggedIn = () => {
  if (getCurrUserInfo()) return true;
  return false;
};
