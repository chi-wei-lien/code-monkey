import request from "../request";

const likeQuestion = async (
  data: {
    q_id: number;
    like: boolean;
  },
  onAuthFail: () => void
) => {
  try {
    return await request(
      "POST",
      "/questions/like-question",
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

export default likeQuestion;
