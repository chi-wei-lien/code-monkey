import request from "./request";

const getLangs = async () => {
  try {
    return await request("GET", "/languages/", false);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getLangs;
