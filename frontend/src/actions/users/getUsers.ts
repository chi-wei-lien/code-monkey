import Cookies from "js-cookie";
import request from "../request";

const getUsers = async (onAuthFail: () => void) => {
  const sessionId = Cookies.get("sessionId");
  let useAuth = false;
  try {
    if (sessionId) {
      useAuth = true;
    }

    const json = await request("GET", "/users/get-users", useAuth, onAuthFail);

    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getUsers;
