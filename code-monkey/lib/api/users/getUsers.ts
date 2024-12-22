import request from "../request";

const getUsers = async (useAuth: boolean, onAuthFail: () => void) => {
  try {
    const json = await request("GET", "/users/get-users", useAuth, onAuthFail);
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getUsers;
