import { jwtDecode } from "jwt-decode";
import JwtPayload from "@/types/JwtPayload";
import Cookies from "js-cookie";

export const getCurrUserInfo = (onAuthFail: () => void) => {
  const sessionId = Cookies.get("sessionId");
  if (!sessionId) {
    onAuthFail();
    return undefined;
  }
  try {
    const payload = jwtDecode<JwtPayload>(sessionId);
    return { username: payload.username, userId: parseInt(payload.user_id) };
  } catch (error) {
    console.error("Invalid JWT token:", error);
    onAuthFail();
    return undefined;
  }
};

export const checkIsLoggedIn = (onAuthFail: () => void) => {
  if (getCurrUserInfo(onAuthFail)) return true;
  return false;
};
