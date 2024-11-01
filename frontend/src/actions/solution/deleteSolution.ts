import request from "../request";

const deleteQuestion = async (s_id: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("s_id", s_id.toString());

  try {
    const json = await request(
      "DELETE",
      `/questions/delete-solution?${searchParams.toString()}`,
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
