import request from "./request";

const deleteQuestion = async (q_id: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("q_id", q_id.toString());

  try {
    const json = await request(
      "DELETE",
      `/questions/delete-question?${searchParams.toString()}`,
      false
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default deleteQuestion;
