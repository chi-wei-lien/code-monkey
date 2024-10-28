import request from "./request";

const markQuestion = async (
  data: {
    q_id: number;
    done: boolean;
    difficulty: number;
  },
  onAuthFail: () => void
) => {
  try {
    return await request(
      "POST",
      "/questions/mark-question",
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

export default markQuestion;
