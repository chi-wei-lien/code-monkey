import request from "../request";

const getUsers = async (groupId: number, onAuthFail?: () => void) => {
  const searchParams = new URLSearchParams();
  searchParams.append("group_id", groupId.toString());

  try {
    const json = await request(
      "GET",
      `/users/get-users?${searchParams}`,
      true,
      onAuthFail
    );
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default getUsers;
