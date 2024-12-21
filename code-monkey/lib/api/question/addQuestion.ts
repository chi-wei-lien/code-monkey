import request from "../request";

const addQuestion = async (
  onAuthFail: () => void,
  data: { name: string; link: string }
) => {
  try {
    return await request(
      "POST",
      "/questions/add-question",
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

export default addQuestion;
