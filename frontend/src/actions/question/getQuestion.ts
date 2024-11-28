import request from "../request";

const getQuestion = async (q_id: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("q_id", q_id.toString());

  try {
    const json = await request(
      "GET",
      `/questions/get-question?${searchParams.toString()}`,
      false
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const getQuestionByName = async (q_name: string) => {
  const searchParams = new URLSearchParams();
  searchParams.append("q_name", q_name.toString());

  try {
    const json = await request(
      "GET",
      `/questions/get-question?${searchParams.toString()}`,
      false
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getQuestion;
