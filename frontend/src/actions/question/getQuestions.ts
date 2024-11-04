import request from "../request";

const getQuestions = async (qNameQuery: string, selectedUser?: number) => {
  const searchParams = new URLSearchParams();
  if (qNameQuery !== "") {
    searchParams.append("q_name", qNameQuery);
  }
  if (selectedUser) {
    searchParams.append("u_id", selectedUser.toString());
  }

  try {
    const json = await request(
      "GET",
      `/questions?${searchParams.toString()}`,
      false
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getQuestions;
