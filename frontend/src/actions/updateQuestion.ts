import request from "./request";

const updateQuestion = async (
  onAuthFail: () => void,
  data: { name: string; link: string }
) => {
  try {
    return await request(
      "PUT",
      "/questions/update-question",
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

export default updateQuestion;
