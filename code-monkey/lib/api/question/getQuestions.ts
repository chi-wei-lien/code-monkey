import request from "../request";

const getQuestions = async (
  qNameQuery: string,
  currUser: number,
  queryNotCompleted: boolean,
  selectedUser?: number
) => {
  const searchParams = new URLSearchParams();
  if (qNameQuery !== "") {
    searchParams.append("q_name", qNameQuery);
  }
  if (selectedUser) {
    searchParams.append("u_id", selectedUser.toString());
  }
  if (queryNotCompleted && currUser != -1) {
    searchParams.append("my_id", currUser.toString());
    searchParams.append("completed", "false");
  }

  try {
    const json = await request(
      "GET",
      `/questions?${searchParams.toString()}`,
      currUser !== -1
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getQuestions;
