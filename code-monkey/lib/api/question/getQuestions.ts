import request from "../request";

const getQuestions = async (
  qNameQuery: string,
  useAuth: boolean,
  queryNotCompleted: boolean,
  currUser?: number,
  selectedUser?: number
) => {
  const searchParams = new URLSearchParams();
  if (qNameQuery !== "") {
    searchParams.append("q_name", qNameQuery);
  }
  if (selectedUser) {
    searchParams.append("u_id", selectedUser.toString());
  }
  if (queryNotCompleted && currUser) {
    searchParams.append("my_id", currUser.toString());
    searchParams.append("completed", "false");
  }

  try {
    const json = await request(
      "GET",
      `/questions?${searchParams.toString()}`,
      useAuth
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getQuestions;
