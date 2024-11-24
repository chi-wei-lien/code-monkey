import Cookies from "js-cookie";
import { SERVER_ADDRESS } from "../constants";

const request = async (
  method: string,
  path: string,
  useAuth: boolean,
  onAuthFail?: () => void,
  onSuccess?: (json: any) => Promise<void>,
  data?: any,
  retry = 1
): Promise<any> => {
  const sessionId = Cookies.get("sessionId");
  const refreshToken = Cookies.get("refresh");

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
  };

  try {
    const response = await fetch(SERVER_ADDRESS + path, {
      method: method,
      headers: {
        ...(useAuth && sessionId && { Authorization: `Bearer ${sessionId}` }),
        ...(data && {
          "Content-Type": "application/json",
        }),
      },
      body: data && JSON.stringify(data),
    });

    if (response.status === 403 || response.status === 401) {
      if (retry === 1 && refreshToken) {
        await request(
          "POST",
          "/users/refresh",
          true,
          onAuthFail,
          storeToken,
          { refresh: refreshToken },
          0
        );
        return await request(
          method,
          path,
          true,
          onAuthFail,
          undefined,
          data,
          0
        );
      } else {
        if (onAuthFail) onAuthFail();
      }
    }

    const json = await response.json();
    if (!response.ok) {
      const msg = json.detail ? json.detail : json;
      throw new Error(msg);
    }
    if (onSuccess) onSuccess(json);
    return json;
  } catch (error) {
    throw error;
  }
};

export default request;
