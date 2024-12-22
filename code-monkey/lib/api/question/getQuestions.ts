import request from "../request";

const getQuestions = async (
  qNameQuery: string,
  useAuth: boolean,
  queryNotCompleted: boolean,
  pageSize: number,
  takeLower: boolean,
  firstQuestionId?: number,
  lastQuestionId?: number,
  firstPostedTime?: Date,
  lastPostedTime?: Date,
  currUser?: number,
  selectedUser?: number
) => {
  console.log("test page size", pageSize);
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
  if (firstQuestionId) {
    searchParams.append("first_q_id", firstQuestionId.toString());
  }
  if (lastQuestionId) {
    searchParams.append("last_q_id", lastQuestionId.toString());
  }
  if (firstPostedTime) {
    searchParams.append("first_posted_time", firstPostedTime.toISOString());
  }
  console.log("my last post time", lastPostedTime);
  if (lastPostedTime) {
    searchParams.append("last_posted_time", lastPostedTime.toISOString());
  }
  if (takeLower) {
    searchParams.append("take_lower", "true");
  }

  searchParams.append("page_size", pageSize.toString());

  try {
    const json = await request(
      "GET",
      `/questions?${searchParams.toString()}`,
      useAuth
    );
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getQuestions;
