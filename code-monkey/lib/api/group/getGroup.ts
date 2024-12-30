import request from "../request";

export const getGroup = async (groupId: number, onAuthFail?: () => void) => {
  const searchParams = new URLSearchParams();
  searchParams.append("group_id", groupId.toString());
  try {
    const json = await request(
      "GET",
      `/groups/get-group?${searchParams.toString()}`,
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
