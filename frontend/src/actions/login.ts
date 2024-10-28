import Cookies from "js-cookie";
import request from "./request";

const login = async (
  data: { username: string; password: string },
  onSuccess: () => void,
  onAuthFail: () => void,
  onError: (msg: string) => void
) => {
  const storeToken = async (json: any) => {
    await Cookies.set("sessionId", json.access, {
      expires: 1,
      secure: false,
      sameSite: "Lax",
    });
    await Cookies.set("refresh", json.refresh, {
      expires: 7,
      secure: false,
      sameSite: "Lax",
    });
    onSuccess();
  };

  try {
    return await request(
      "POST",
      "/users/login",
      false,
      onAuthFail,
      storeToken,
      data
    );
  } catch (error) {
    if (error instanceof Error) {
      onError(error.message);
      console.error(error.message);
    }
  }
};

export default login;
