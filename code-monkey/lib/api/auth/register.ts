import Cookies from "js-cookie";
import request from "../request";
import { AccessTokenType } from "@/types/AuthTokenType";

const register = async (
  data: { username: string; password: string },
  onSuccess: () => void,
  onAuthFail: () => void,
  onError: (msg: string) => void
) => {
  const storeToken = async (json: AccessTokenType) => {
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
      "/users/register",
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

export default register;
