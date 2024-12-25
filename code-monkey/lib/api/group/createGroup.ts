import request from "../request";

const createGroup = async (onAuthFail: () => void, data: { name: string }) => {
  try {
    return await request(
      "POST",
      "/groups/create-group",
      true,
      onAuthFail,
      undefined,
      data
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default createGroup;
