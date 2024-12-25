import request from "../request";

export const getGroups = async (onAuthFail?: () => void) => {
  try {
    const json = await request("GET", "/groups", true, onAuthFail);
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
